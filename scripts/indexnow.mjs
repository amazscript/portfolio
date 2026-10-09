// Prévient Bing (et les autres moteurs IndexNow : Yandex, Seznam, Naver…) que les pages
// du sitemap ont changé, pour qu'elles soient réexplorées en minutes plutôt qu'en jours.
// Lancé par `make prod` après un déploiement effectif. Google n'utilise pas IndexNow.
//
// La clé est le nom du fichier public/<clé>.txt (qui contient la clé elle-même) : elle est
// publique par conception, elle prouve seulement que l'envoi vient du propriétaire du site.

import { readdirSync } from "node:fs";

const SITE = "https://decilapdenis.fr";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const keyFile = readdirSync(new URL("../public/", import.meta.url)).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error("IndexNow : aucune clé trouvée dans public/ (fichier <32 hex>.txt).");
  process.exit(1);
}
const key = keyFile.replace(".txt", "");
const keyLocation = `${SITE}/${keyFile}`;

// Le conteneur vient de redémarrer : on attend que la clé soit servie avant d'envoyer.
async function waitForKey(attempts = 12) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(keyLocation, { cache: "no-store" });
      if (res.ok && (await res.text()).trim() === key) return true;
    } catch {
      // site en cours de redémarrage
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
  return false;
}

if (!(await waitForKey())) {
  console.error(`IndexNow : ${keyLocation} injoignable, envoi annulé (le déploiement n'est pas en cause).`);
  process.exit(1);
}

const sitemap = await (await fetch(`${SITE}/sitemap.xml`, { cache: "no-store" })).text();
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) {
  console.error("IndexNow : sitemap vide ou illisible, envoi annulé.");
  process.exit(1);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key, keyLocation, urlList }),
});

// 200 = reçu, 202 = reçu (clé en cours de validation) ; le reste est une erreur.
if (res.status === 200 || res.status === 202) {
  console.log(`IndexNow : ${urlList.length} URL signalées (HTTP ${res.status}).`);
} else {
  console.error(`IndexNow : refus HTTP ${res.status} : ${await res.text()}`);
  process.exit(1);
}
