"use client";

import { allLessons, curriculum, lessonPath, moduleProgress, nextUnfinishedLesson, tomeName, tomeNumber } from "@lpe/curriculum";
import { Case, GuideSays, Hanko, Oss, Recit, Slot } from "@lpe/ui";
import Link from "next/link";
import { RankCard } from "@/components/rank-card";
import { Alert, buttonClass, Spinner } from "@/components/ui";
import { useUser } from "@/lib/auth-context";
import { useProgress } from "@/lib/learning";

/** Numéro de kata (1 à 11) dans tout le parcours. */
const kataNumber = new Map(allLessons.map((r) => [r.lesson.id, r.index + 1]));

export default function DashboardPage() {
  const user = useUser();
  const progress = useProgress(user.uid);

  if (progress.isPending) return <Spinner label="Chargement de ta progression" />;
  if (progress.isError) return <Alert>Impossible de charger ta progression. Recharge la page.</Alert>;

  const completed = progress.data;
  const validated = allLessons.filter((r) => completed.has(r.lesson.id)).length;
  const resume = nextUnfinishedLesson(completed);
  const firstName = user.displayName?.split(" ")[0];

  return (
    <div className="flex flex-col gap-12">
      <section aria-labelledby="hello" className="grid gap-gutter md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <div className="flex flex-col gap-gutter">
          <h1 id="hello" className="bd-h2">
            {firstName ? `Salut ${firstName}.` : "Salut."}
          </h1>
          <RankCard validated={validated} />
          {resume && (
            <GuideSays src="/illustrations/guide-portrait.jpg">{resume.lesson.video.prep.takeaway}</GuideSays>
          )}
        </div>

        {resume ? (
          <Case act className="flex flex-col items-start gap-4 bg-amber-pale p-5">
            <Recit>
              Tome {tomeNumber(resume.module)} · {tomeName(resume.module)}
            </Recit>
            <div>
              <p className="font-mono text-[11px] text-ink-soft">
                {validated === 0 ? "TON PREMIER KATA" : "TON PROCHAIN KATA"} · KATA {resume.index + 1}
              </p>
              <h2 className="bd-h3 mt-1 text-2xl">{resume.lesson.title}</h2>
              <p className="mt-2 max-w-[60ch] text-ink-soft">{resume.lesson.summary}</p>
            </div>
            <p className="text-sm">
              <span className="font-semibold">Livrable :</span> {resume.lesson.exercise.deliverable}
            </p>
            <Link href={lessonPath(resume)} className={buttonClass("primary", "mt-auto")}>
              {validated === 0 ? "Commencer" : "Reprendre"} le kata {resume.index + 1}
            </Link>
          </Case>
        ) : (
          <Case sky className="flex flex-col items-start justify-center gap-4 p-6">
            <Oss />
            <p className="text-lg font-semibold">Ton dossier de livraison est prêt. Tu peux le montrer en entretien.</p>
          </Case>
        )}
      </section>

      {curriculum.map((module) => {
        const p = moduleProgress(module, completed);
        return (
          <section key={module.id} aria-labelledby={`m-${module.id}`} className="flex flex-col gap-4">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
              <div>
                <Recit>
                  Tome {tomeNumber(module)} · {tomeName(module)}
                </Recit>
                <h2 id={`m-${module.id}`} className="bd-h3 mt-3 text-xl">
                  {module.title}
                </h2>
                <p className="mt-1 max-w-[62ch] text-sm text-ink-soft">{module.tagline}</p>
              </div>
              <span className="font-mono text-[11px] text-ink-soft">
                {p.done} / {p.total} VALIDÉS
              </span>
            </div>
            <ol className="flex flex-col gap-gutter">
              {module.lessons.map((lesson) => {
                const done = completed.has(lesson.id);
                const isNext = resume?.lesson.id === lesson.id;
                const n = kataNumber.get(lesson.id);
                return (
                  <li key={lesson.id}>
                    <Link
                      href={lessonPath({ module, lesson })}
                      className={`bd-case flex items-center gap-3 px-3.5 py-3 transition hover:bg-sky-mist ${
                        isNext ? "bg-amber-pale hover:bg-amber-pale" : ""
                      }`}
                    >
                      {done ? <Hanko /> : <Slot />}
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium">{lesson.title}</span>
                        <span className="block font-mono text-[11px] text-ink-soft">
                          KATA {n} · {lesson.exercise.title}
                          {lesson.video.status === "ready" ? ` · ${lesson.video.minutes} min` : " · vidéo à venir"}
                          {done && " · validé"}
                        </span>
                      </span>
                      {isNext && <span className="bd-recit hidden sm:inline-block">À faire maintenant</span>}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
