"use client";

import {
  curriculum,
  lessonPath,
  moduleProgress,
  nextUnfinishedLesson,
  totalLessons,
} from "@lpe/curriculum";
import Link from "next/link";
import { Alert, buttonClass, ProgressBar, Spinner } from "@/components/ui";
import { useUser } from "@/lib/auth-context";
import { useProgress } from "@/lib/learning";

export default function DashboardPage() {
  const user = useUser();
  const progress = useProgress(user.uid);

  if (progress.isPending) return <Spinner label="Chargement de ta progression" />;
  if (progress.isError) return <Alert>Impossible de charger ta progression. Recharge la page.</Alert>;

  const completed = progress.data;
  const resume = nextUnfinishedLesson(completed);
  const firstName = user.displayName?.split(" ")[0];

  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-2xl border border-border bg-surface p-6">
        <h1 className="text-2xl font-semibold">{firstName ? `Salut ${firstName}` : "Salut"} 👋</h1>
        <p className="mt-1 text-sm text-muted">
          {completed.size} leçon{completed.size > 1 ? "s" : ""} terminée{completed.size > 1 ? "s" : ""} sur {totalLessons}
        </p>
        <div className="mt-4">
          <ProgressBar ratio={completed.size / totalLessons} label="Progression globale" />
        </div>
        <div className="mt-6">
          {resume ? (
            <Link href={lessonPath(resume)} className={buttonClass()}>
              {completed.size === 0 ? "Commencer" : "Reprendre"} : {resume.lesson.title}
            </Link>
          ) : (
            <Alert tone="success">Bravo, tu as terminé la formation. Ton dossier fil rouge est prêt pour tes entretiens.</Alert>
          )}
        </div>
      </section>

      <div className="flex flex-col gap-6">
        {curriculum.map((module) => {
          const p = moduleProgress(module, completed);
          return (
            <section key={module.id} aria-labelledby={`m-${module.id}`} className="rounded-2xl border border-border bg-surface p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-accent">{module.kicker}</p>
              <h2 id={`m-${module.id}`} className="mt-1 text-lg font-semibold">
                {module.title}
              </h2>
              <p className="mt-1 text-sm text-muted">{module.tagline}</p>
              <div className="mt-4 flex items-center gap-3">
                <ProgressBar ratio={p.ratio} label={`Progression ${module.kicker}`} />
                <span className="shrink-0 text-xs text-muted">
                  {p.done}/{p.total}
                </span>
              </div>
              <ol className="mt-4 divide-y divide-border">
                {module.lessons.map((lesson, i) => {
                  const done = completed.has(lesson.id);
                  return (
                    <li key={lesson.id}>
                      <Link
                        href={lessonPath({ module, lesson })}
                        className="flex items-center gap-3 py-3 text-sm hover:text-accent"
                      >
                        <span
                          aria-hidden
                          className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-xs ${
                            done ? "border-success bg-success text-white" : "border-border text-muted"
                          }`}
                        >
                          {done ? "✓" : i + 1}
                        </span>
                        <span className="flex-1">{lesson.title}</span>
                        <span className="sr-only">{done ? "terminée" : "à faire"}</span>
                        <span className="text-xs text-muted">
                          {lesson.video.status === "ready" ? `${lesson.video.minutes} min` : "vidéo à venir"}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </div>
  );
}
