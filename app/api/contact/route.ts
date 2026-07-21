import { NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Rate-limiting en mémoire (par IP) — suffisant pour un portfolio.
 * En production multi-instance, remplacer par un store partagé (Upstash, Redis).
 */
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function limited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

/** Config via variables d'environnement — aucune clé exposée côté client. */
const RESEND_API_KEY = process.env.RESEND_API_KEY;
/** SMTP (ex : Gandi) — prioritaire s'il est configuré. */
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

/** Anti-robot Cloudflare Turnstile — vérifié seulement si la clé secrète est configurée. */
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;

const CONTACT_TO = process.env.CONTACT_TO_EMAIL || site.email;
/** En SMTP, l'expéditeur doit être la boîte authentifiée, sinon le serveur rejette. */
const CONTACT_FROM =
  process.env.CONTACT_FROM_EMAIL ||
  (SMTP_USER ? `Portfolio <${SMTP_USER}>` : "Portfolio <onboarding@resend.dev>");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "Trop de requêtes. Réessayez dans une minute." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  /** Honeypot : si rempli, c'est un bot → on répond OK sans rien traiter. */
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  /** Anti-robot Turnstile : validé côté serveur si la clé secrète est configurée. */
  if (TURNSTILE_SECRET) {
    const token = String(body["cf-turnstile-response"] ?? "");
    if (!token) {
      return NextResponse.json({ error: "Validation anti-robot manquante." }, { status: 400 });
    }
    try {
      const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: TURNSTILE_SECRET, response: token, remoteip: ip }),
      });
      const outcome = (await verify.json()) as { success?: boolean };
      if (!outcome.success) {
        return NextResponse.json({ error: "Validation anti-robot échouée. Réessayez." }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "Vérification anti-robot indisponible. Réessayez." }, { status: 502 });
    }
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (name.length < 2) return NextResponse.json({ error: "Nom requis." }, { status: 400 });
  if (!isEmail(email)) return NextResponse.json({ error: "E-mail invalide." }, { status: 400 });
  if (message.length < 10)
    return NextResponse.json({ error: "Message trop court." }, { status: 400 });

  const subjectLine = subject ? `Contact portfolio — ${subject}` : "Nouveau message depuis le portfolio";
  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#0f172a">
      <h2 style="margin:0 0 12px">Nouveau message depuis le portfolio</h2>
      <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mail :</strong> ${escapeHtml(email)}</p>
      ${subject ? `<p><strong>Sujet :</strong> ${escapeHtml(subject)}</p>` : ""}
      <p><strong>Message :</strong></p>
      <p style="white-space:pre-wrap;padding:12px;background:#f8fafc;border-radius:8px">${escapeHtml(message)}</p>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0"/>
      <p style="font-size:12px;color:#64748b">IP : ${escapeHtml(ip)}</p>
    </div>`;

  /** 1) SMTP (ex : Gandi) — prioritaire s'il est configuré. */
  if (SMTP_HOST && SMTP_USER && SMTP_PASSWORD) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
      });
      await transporter.sendMail({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        replyTo: email,
        subject: subjectLine,
        html,
      });
      return NextResponse.json({ ok: true, delivered: true });
    } catch (err) {
      console.error("[contact] SMTP error:", err);
      return NextResponse.json(
        { error: "L'envoi a échoué. Réessayez ou écrivez-moi directement." },
        { status: 502 }
      );
    }
  }

  /** 2) Repli gracieux : sans SMTP ni clé Resend, on journalise sans casser l'UX. */
  if (!RESEND_API_KEY) {
    console.warn("[contact] Aucun transport configuré (SMTP/Resend) — message journalisé :", {
      name,
      email,
      subject,
      ip,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  /** 3) Resend (repli si clé présente). */
  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: subjectLine,
      html,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "L'envoi a échoué. Réessayez ou écrivez-moi directement." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Exception:", err);
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez plus tard." }, { status: 500 });
  }
}
