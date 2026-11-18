import { allLessons, beltAtEndOf, belts, curriculum, stats, tomeNumber, type Module } from "@lpe/curriculum";
import { Belt, Bulle, buttonClass, Case, Fiche, Logo, Recit } from "@lpe/ui";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://leproductengineer-go.web.app";
const SIGNUP_URL = `${APP_URL}/signup/`;

/* Les couvertures suivent le même projet qui se précise, d'un tome à l'autre. */
const covers: Record<string, { from: string; text: string }> = {
  introduction: { from: "Ton fil rouge", text: "Utilisateur, problème, résultat attendu." },
  produit: { from: "Fiche problème", text: "Demande → problème → hypothèse → métrique." },
  design: { from: "Parcours", text: "Chaque étape et ses états : vide, erreur, plein." },
  tech: { from: "Décision tech", text: "ADR, modèle de données, plan de livraison." },
};

const hats = [
  { title: "Produit", text: "Comprendre le vrai besoin, prioriser, repérer les risques et les tester avant d'écrire du code." },
  { title: "Design", text: "Penser le parcours avant l'écran, prévoir tous les états, faire des choix d'interface que tu sais défendre." },
  { title: "Tech", text: "Choisir la stack avec des critères, modéliser les données pour l'usage, livrer et mesurer." },
];

const kataParts = [
  { title: "Une vidéo courte", text: "Moins de dix minutes, une idée, un exemple tiré d'une vraie app." },
  { title: "Un exercice", text: "Appliqué à ton projet fil rouge, avec sa checklist. Tes réponses sont enregistrées dans ton espace." },
  { title: "Une skill", text: "Un fichier SKILL.md pour que ton agent IA raisonne comme un Product Engineer avec toi." },
];

const faq = [
  { q: "C'est vraiment gratuit ?", a: "Oui. Tu crées un compte et tu as accès aux quatre tomes, exercices et skills compris." },
  {
    q: "Il faut quel niveau ?",
    a: "Tu sais déjà coder et livrer une feature. La formation ne t'apprend pas un langage : elle t'apprend à décider quoi construire et pourquoi.",
  },
  {
    q: "Comment je gagne une ceinture ?",
    a: "Chaque kata validé pose un cran. Tu valides un kata quand tu as coché toute la checklist de son exercice. Une nouvelle couleur tous les deux katas, la noire au dernier.",
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

/** Le numéro de kata (1 à 11) d'une leçon dans tout le parcours. */
const kataNumber = new Map(allLessons.map((r) => [r.lesson.id, r.index + 1]));

function katasLabel(n: number) {
  return `${n} kata${n > 1 ? "s" : ""}`;
}

function Tome({ module }: { module: Module }) {
  const cover = covers[module.slug];
  const endBelt = beltAtEndOf(module);
  return (
    <li className="bd-case grid grid-rows-[auto_auto_1fr]">
      <div className="flex items-baseline justify-between border-b-[2.5px] border-ink bg-paper px-3 pt-2.5 pb-2">
        <span className="font-mono text-[10px] tracking-widest">TOME</span>
        <span className="font-title text-lg font-black italic leading-none">{tomeNumber(module)}</span>
      </div>
      <div className="bd-sky relative min-h-44">
        <div className="bd-trame absolute inset-0" />
        {cover && (
          <Fiche from={cover.from} className="absolute inset-x-2.5 top-2.5 text-[11px]">
            {cover.text}
          </Fiche>
        )}
        <Belt id={endBelt.id} className="absolute inset-x-2.5 bottom-2.5 h-2.5" />
      </div>
      <div className="flex flex-col gap-3 border-t-[2.5px] border-ink bg-paper px-3 pt-2.5 pb-3.5">
        <div>
          <h3 className="bd-h3 text-base">{module.title}</h3>
          <p className="mt-1.5 font-mono text-[11px] text-ink-soft">
            {katasLabel(module.lessons.length)} · fin du tome : {endBelt.label.toLowerCase()}
          </p>
        </div>
        <ul className="flex flex-col gap-1.5 text-[13px] leading-snug">
          {module.lessons.map((l) => (
            <li key={l.id} className="grid grid-cols-[auto_1fr] gap-2">
              <span className="font-mono text-[11px] text-ink-soft">{String(kataNumber.get(l.id)).padStart(2, "0")}</span>
              {l.title}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function Landing() {
  return (
    <>
      <div className="bd-sky border-b-[3px] border-ink">
        <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5">
          <Logo />
          <nav aria-label="Sections" className="hidden gap-5 font-letter text-sm font-bold sm:flex">
            <a href="#tomes" className="hover:underline">Les tomes</a>
            <a href="#guide" className="hover:underline">Ton guide</a>
            <a href="#questions" className="hover:underline">Questions</a>
          </nav>
          <a href={`${APP_URL}/login/`} className={buttonClass("secondary", { small: true })}>
            Se connecter
          </a>
        </header>

        <section aria-labelledby="hero-title" className="mx-auto w-full max-w-6xl px-4 pt-8 pb-12 sm:pt-14">
          <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div className="min-w-0">
              <p className="bd-kicker">Formation gratuite pour développeurs</p>
              <h1 id="hero-title" className="bd-title mt-4 max-w-4xl">
                De dev à Product Engineer. <span className="bd-title-inv">Kata</span> par kata.
              </h1>
              <p className="mt-5 max-w-[54ch] text-lg text-ink-soft text-pretty">
                {stats.lessons} katas, {curriculum.length} tomes, un seul projet fil rouge. À la fin, tu as un dossier de
                livraison de deux pages à montrer en entretien : le problème, tes décisions produit, design et tech, et ton
                plan de mesure.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <a href={SIGNUP_URL} className={buttonClass("primary")}>
                Commencer le tome 1
              </a>
              <a href="#tomes" className="bd-link">
                Voir les {stats.lessons} katas
              </a>
            </div>
          </div>

          {/* Une seule demande sur trois cases : elle arrive, tu la creuses, tu choisis par quoi commencer. */}
          <ol aria-label="Une demande, trois cases" className="mt-10 grid gap-gutter sm:grid-cols-[1fr_0.8fr_1.3fr]">
            <li className="bd-case min-h-72">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/illustrations/hero-demande.jpg" alt="" width={480} height={600} className="bd-art absolute inset-0" />
              <Recit className="absolute top-2 left-2 z-10 max-w-[calc(100%-16px)]">Lundi, 9 h. Une demande tombe.</Recit>
              <Fiche from="Demande · client" className="absolute inset-x-2.5 bottom-2.5 z-10">
                « Ajoute un export CSV. »
              </Fiche>
            </li>
            <li className="bd-case min-h-72">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/illustrations/hero-question.jpg" alt="" width={480} height={600} className="bd-art absolute inset-0" />
              <Fiche from="Demande · client" struck note="Qui l'ouvre, et pour en faire quoi ?" className="absolute inset-x-2.5 bottom-2.5 z-10">
                « Ajoute un export CSV. »
              </Fiche>
            </li>
            <li className="bd-case min-h-72">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/illustrations/hero-increment.jpg" alt="" width={560} height={700} className="bd-art absolute inset-0" />
              <Recit className="absolute top-2 left-2 z-10 max-w-[calc(100%-16px)]">
                Tu choisis par quoi commencer, et tu sais pourquoi.
              </Recit>
              <Fiche from="Incrément 1 · choisi" className="absolute inset-x-2.5 bottom-2.5 z-10">
                Exporter les factures du mois pour le comptable. Un bouton, un fichier.
              </Fiche>
            </li>
          </ol>
        </section>
      </div>

      <main className="flex-1">
        <section aria-labelledby="constat" className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
            <div>
              <h2 id="constat" className="bd-h2">Le ticket dit quoi coder. Personne ne te dit si ça valait le coup.</h2>
              <p className="mt-4 max-w-[60ch] text-ink-soft">
                Avec l&apos;IA, écrire du code coûte de moins en moins cher. Ce qui reste rare, c&apos;est le dev qui sait
                pourquoi une feature mérite d&apos;exister, à quoi elle doit ressembler et comment la livrer sans dette.
                C&apos;est ça, un Product Engineer. Trois casquettes.
              </p>
            </div>
            <ul className="grid gap-gutter sm:grid-cols-3">
              {hats.map((h) => (
                <li key={h.title}>
                  <Case className="h-full p-4">
                    <h3 className="bd-h3">{h.title}</h3>
                    <p className="mt-2 text-sm text-ink-soft">{h.text}</p>
                  </Case>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="tomes" aria-labelledby="tomes-title" className="scroll-mt-6 border-y-[3px] border-ink bg-sky">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
              <h2 id="tomes-title" className="bd-h2">Quatre tomes, un seul projet</h2>
              <p className="max-w-[56ch] text-ink-soft">
                Chaque module est un tome, chaque leçon un kata. Ton projet fil rouge traverse les quatre : il part
                d&apos;une demande et finit en dossier de livraison.
              </p>
            </div>
            <ol className="mt-8 grid gap-gutter sm:grid-cols-2 lg:grid-cols-4">
              {curriculum.map((m) => (
                <Tome key={m.id} module={m} />
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="ceintures" className="mx-auto max-w-6xl px-4 py-20">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <h2 id="ceintures" className="bd-h2">
              7 ceintures, {stats.lessons} katas
            </h2>
            <p className="max-w-[56ch] text-ink-soft">
              Chaque kata validé pose un cran sur ta ceinture. Deux crans, et tu passes à la couleur suivante. Le dernier
              kata donne la noire.
            </p>
          </div>
          <ol className="mt-8 grid grid-cols-2 gap-gutter sm:grid-cols-4 lg:grid-cols-7">
            {belts.map((b) => (
              <li key={b.id}>
                <Case className="flex h-full flex-col gap-2.5 px-3 pt-3.5 pb-4">
                  <Belt id={b.id} />
                  <span className="font-title text-xl font-black italic uppercase leading-none">{b.label}</span>
                  <span className="font-mono text-[10px] tracking-wider text-ink-soft uppercase">
                    {b.from === 0 ? "Au départ" : `Après kata ${b.from}`}
                  </span>
                </Case>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="kata" className="border-y-[3px] border-ink bg-paper">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <h2 id="kata" className="bd-h2">Chaque kata, trois choses</h2>
              <p className="mt-4 max-w-[48ch] text-ink-soft">
                Tu regardes, tu appliques sur ton projet, tu repars avec un outil pour ton agent.
              </p>
            </div>
            <ul className="grid gap-gutter sm:grid-cols-3">
              {kataParts.map((s) => (
                <li key={s.title} className="border-t-[3px] border-ink pt-3">
                  <h3 className="bd-h3">{s.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{s.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-label="Pour qui" className="mx-auto grid max-w-6xl gap-gutter px-4 py-20 sm:grid-cols-2">
          <Case className="p-6">
            <h2 className="bd-h3 text-xl">Pour toi si…</h2>
            <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-[15px]">
              <li>Tu es dev (front, back, mobile, full-stack) et tu livres déjà en production.</li>
              <li>Tu veux peser sur les décisions, pas seulement fermer des tickets.</li>
              <li>Tu vises un poste de Product Engineer en startup ou scale-up.</li>
            </ul>
          </Case>
          <Case className="p-6">
            <h2 className="bd-h3 text-xl">Pas pour toi si…</h2>
            <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-[15px] text-ink-soft">
              <li>Tu cherches à apprendre à coder.</li>
              <li>Tu veux devenir PM et ne plus toucher au code.</li>
              <li>Tu veux un certificat plutôt qu&apos;un dossier de vraies décisions.</li>
            </ul>
          </Case>
        </section>

        <section id="guide" aria-labelledby="guide-title" className="scroll-mt-6 bd-sky border-y-[3px] border-ink">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-20 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <Case className="aspect-[5/4] w-full max-w-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/illustrations/guide-portrait.jpg"
                alt="Youcef El Kamel en karatéka dessiné, ceinture noire"
                width={560}
                height={700}
                className="bd-art"
                // Les visuels provisoires portent un titre en haut et une signature en bas : on resserre.
                style={{ objectPosition: "50% 50%", transform: "scale(1.25)", transformOrigin: "50% 40%" }}
              />
              <Recit className="absolute top-2.5 left-2.5">Ton guide : Youcef</Recit>
            </Case>
            <div className="flex min-w-0 flex-col gap-5">
              <h2 id="guide-title" className="bd-h2">Qui est derrière</h2>
              <p className="max-w-[60ch] text-ink-soft">
                Je suis Youcef El Kamel. Développeur, ex-CTO, j&apos;ai conçu, designé et livré des apps du premier écran
                à la production, comme BeeDone, Evolum ou UpDrive.
              </p>
              <Bulle className="max-w-[46ch]">
                Cette formation, c&apos;est la méthode que j&apos;applique chaque jour, avec les erreurs qui me l&apos;ont
                apprise.
              </Bulle>
            </div>
          </div>
        </section>

        <section id="questions" aria-labelledby="faq" className="mx-auto max-w-3xl scroll-mt-6 px-4 py-20">
          <h2 id="faq" className="bd-h2">Questions fréquentes</h2>
          <div className="mt-8 flex flex-col gap-gutter">
            {faq.map((f) => (
              <details key={f.q} className="group bd-case px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {f.q}
                    <span aria-hidden className="text-2xl leading-none font-semibold transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-2 text-[15px] text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="go" className="mx-auto max-w-6xl px-4 pb-24">
          <Case sky className="flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="go" className="bd-h2">Ta ceinture blanche t&apos;attend.</h2>
              <p className="mt-2 text-ink-soft">Gratuit, sans carte bancaire.</p>
            </div>
            <a href={SIGNUP_URL} className={buttonClass("primary")}>
              Créer mon compte
            </a>
          </Case>
        </section>
      </main>

      <footer className="border-t-[3px] border-ink bg-paper py-8 text-center font-mono text-xs text-ink-soft">
        © {new Date().getFullYear()} Le Product Engineer · Youcef El Kamel
      </footer>
    </>
  );
}
