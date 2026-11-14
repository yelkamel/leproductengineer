import { curriculum, stats } from "@lpe/curriculum";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://leproductengineer-go.web.app";
const SIGNUP_URL = `${APP_URL}/signup/`;

const cta =
  "inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const hats = [
  {
    title: "Produit",
    text: "Comprendre le vrai besoin, prioriser, repérer les risques et les tester avant d'écrire du code.",
  },
  {
    title: "Design",
    text: "Penser le parcours avant l'écran, prévoir tous les états, faire des choix d'interface que tu sais défendre.",
  },
  {
    title: "Tech",
    text: "Choisir la stack avec des critères, modéliser les données pour l'usage, livrer et mesurer.",
  },
];

const steps = [
  { title: "Une vidéo courte", text: "Moins de dix minutes, une idée, un exemple tiré d'une vraie app." },
  { title: "Un exercice", text: "Appliqué à ton projet fil rouge. Tes réponses sont enregistrées dans ton espace." },
  { title: "Une skill", text: "Un fichier SKILL.md pour que ton agent IA raisonne comme un Product Engineer avec toi." },
];

const faq = [
  {
    q: "C'est vraiment gratuit ?",
    a: "Oui. Tu crées un compte et tu as accès à l'introduction et aux trois modules, exercices et skills compris.",
  },
  {
    q: "Il faut quel niveau ?",
    a: "Tu sais déjà coder et livrer une feature. La formation ne t'apprend pas un langage : elle t'apprend à décider quoi construire et pourquoi.",
  },
  {
    q: "C'est quoi, une skill ?",
    a: "Un fichier d'instructions que tu installes dans ton agent de code (Claude Code, Codex, Cursor…). Chaque leçon en fournit une pour appliquer la méthode sur tes vrais tickets.",
  },
  {
    q: "Les vidéos sont disponibles ?",
    a: "Elles sont en cours de tournage. Les exercices et les skills sont déjà accessibles, et chaque vidéo arrive dans ton espace dès qu'elle est prête.",
  },
];

export default function Landing() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-5">
        <span className="font-semibold tracking-tight">Le Product Engineer</span>
        <a href={`${APP_URL}/login/`} className="text-sm text-muted hover:text-foreground">
          Se connecter
        </a>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 pt-16 pb-20 sm:pt-24">
          <p className="text-sm font-medium text-accent">Formation gratuite pour développeurs</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Tu sais coder. Apprends à décider quoi construire.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted text-pretty">
            Le Product Engineer porte le produit, le design et la tech. C&apos;est le profil que cherchent les startups et
            les scale-ups. Cette formation t&apos;y emmène, sur ton propre projet.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href={SIGNUP_URL} className={cta}>
              Commencer gratuitement
            </a>
            <a href="#programme" className="text-sm font-medium hover:text-accent">
              Voir le programme ↓
            </a>
          </div>
          <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-border pt-6">
            {[
              [stats.modules, "modules"],
              [stats.lessons, "leçons et exercices"],
              [stats.skills, "skills pour ton agent"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="block text-3xl font-semibold">{value}</span>
                  <span className="text-sm text-muted">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-5xl px-4 py-20">
            <h2 className="max-w-2xl text-2xl font-semibold text-balance sm:text-3xl">
              Le ticket dit quoi coder. Personne ne te dit si ça valait le coup.
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Avec l&apos;IA, écrire du code coûte de moins en moins cher. Ce qui reste rare, c&apos;est le dev qui sait
              pourquoi une feature mérite d&apos;exister, à quoi elle doit ressembler et comment la livrer sans dette.
              C&apos;est ça, un Product Engineer. Trois casquettes :
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {hats.map((h) => (
                <div key={h.title} className="rounded-2xl border border-border bg-background p-6">
                  <h3 className="font-semibold">{h.title}</h3>
                  <p className="mt-2 text-sm text-muted">{h.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="programme" className="mx-auto max-w-5xl scroll-mt-8 px-4 py-20">
          <h2 className="text-2xl font-semibold sm:text-3xl">Le programme</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Une introduction, trois modules et un projet final : le dossier de décisions que tu montres en entretien.
          </p>
          <ol className="mt-10 flex flex-col gap-4">
            {curriculum.map((m) => (
              <li key={m.id} className="rounded-2xl border border-border bg-surface p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-accent">{m.kicker}</p>
                <h3 className="mt-1 text-lg font-semibold">{m.title}</h3>
                <p className="mt-1 text-sm text-muted">{m.outcome}</p>
                <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
                  {m.lessons.map((l) => (
                    <li key={l.id} className="rounded-lg border border-border bg-background px-3 py-2">
                      {l.title}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-5xl px-4 py-20">
            <h2 className="text-2xl font-semibold sm:text-3xl">Chaque leçon, trois choses</h2>
            <ol className="mt-10 grid gap-6 sm:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className="text-sm font-semibold text-accent">0{i + 1}</span>
                  <h3 className="mt-2 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto grid max-w-5xl gap-10 px-4 py-20 sm:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Pour toi si…</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>✓ Tu es dev (front, back, mobile, full-stack) et tu livres déjà en production.</li>
              <li>✓ Tu veux peser sur les décisions, pas seulement fermer des tickets.</li>
              <li>✓ Tu vises un poste de Product Engineer en startup ou scale-up.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Pas pour toi si…</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>✗ Tu cherches à apprendre à coder.</li>
              <li>✗ Tu veux devenir PM et ne plus toucher au code.</li>
              <li>✗ Tu veux un certificat plutôt qu&apos;un dossier de vraies décisions.</li>
            </ul>
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-5xl px-4 py-20">
            <h2 className="text-2xl font-semibold">Qui est derrière</h2>
            <p className="mt-4 max-w-2xl text-muted">
              Je suis Youcef El Kamel. Développeur, ex-CTO, j&apos;ai conçu, designé et livré des apps du premier écran à
              la production, comme BeeDone, Evolum ou UpDrive. Cette formation, c&apos;est la méthode que j&apos;applique
              chaque jour, avec les erreurs qui me l&apos;ont apprise.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-20">
          <h2 className="text-2xl font-semibold">Questions fréquentes</h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {faq.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none font-medium marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {f.q}
                    <span aria-hidden className="text-muted transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-2 text-sm text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-24 text-center">
          <h2 className="text-3xl font-semibold text-balance">Ton premier module t&apos;attend.</h2>
          <p className="mt-3 text-muted">Gratuit, sans carte bancaire.</p>
          <a href={SIGNUP_URL} className={`${cta} mt-8`}>
            Créer mon compte
          </a>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} Le Product Engineer · Youcef El Kamel
      </footer>
    </>
  );
}
