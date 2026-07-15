import { Container, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-6xl font-extrabold text-[var(--accent)]">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page introuvable</h1>
      <p className="mt-2 max-w-md text-[var(--muted)]">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="mt-8 flex gap-3">
        <Button href="/">Retour à l&apos;accueil</Button>
        <Button href="/projets" variant="secondary">
          Voir les réalisations
        </Button>
      </div>
    </Container>
  );
}
