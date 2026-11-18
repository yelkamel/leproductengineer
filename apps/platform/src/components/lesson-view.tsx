"use client";

import { adjacentLessons, allLessons, findLesson, lessonPath, tomeName, tomeNumber } from "@lpe/curriculum";
import { Hanko, Recit } from "@lpe/ui";
import Link from "next/link";
import { useState } from "react";
import { useUser } from "@/lib/auth-context";
import { celebrationFor, type Celebration } from "@/lib/celebration";
import { useProgress, useSubmission, useToggleLessonComplete } from "@/lib/learning";
import { CelebrationDialog } from "./celebration-dialog";
import { ExerciseForm } from "./exercise-form";
import { SkillCard } from "./skill-card";
import { Alert, Button, buttonClass } from "./ui";
import { VideoBlock } from "./video-block";

export function LessonView({ moduleSlug, lessonSlug }: { moduleSlug: string; lessonSlug: string }) {
  const user = useUser();
  const ref = findLesson(moduleSlug, lessonSlug);
  const progress = useProgress(user.uid);
  const submission = useSubmission(user.uid, ref?.lesson.exercise.id ?? "inconnu");
  const toggle = useToggleLessonComplete(user.uid);
  const [celebration, setCelebration] = useState<Celebration | null>(null);

  if (!ref) return <Alert>Leçon introuvable.</Alert>;

  const { module, lesson, index } = ref;
  const { prev, next } = adjacentLessons(lesson.id);
  const done = progress.data?.has(lesson.id) ?? false;
  const validated = allLessons.filter((r) => progress.data?.has(r.lesson.id)).length;

  // Un kata se valide quand toute la checklist de l'exercice est cochée et enregistrée.
  const checklistSize = lesson.exercise.checklist.length;
  const checkedSaved = new Set(submission.data?.checked ?? []).size;
  const checklistComplete = checkedSaved >= checklistSize;
  const kataLabel = `Kata ${index + 1} · ${lesson.exercise.title}`;

  function validate() {
    toggle.mutate(
      { lessonId: lesson.id, completed: true },
      { onSuccess: () => setCelebration(celebrationFor(validated, validated + 1, lesson.exercise.achievement)) },
    );
  }

  return (
    <article className="flex flex-col gap-6">
      <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-3">
        <Link href="/dashboard/" className="bd-link">
          ← Le dojo
        </Link>
        <Recit>
          Tome {tomeNumber(module)} · Kata {index + 1} · {tomeName(module)}
        </Recit>
      </nav>
      <header>
        <h1 className="bd-h2">{lesson.title}</h1>
        <p className="mt-3 max-w-[65ch] text-ink-soft">{lesson.summary}</p>
      </header>

      <VideoBlock video={lesson.video} title={lesson.title} />
      <ExerciseForm key={lesson.exercise.id} exercise={lesson.exercise} lessonId={lesson.id} />
      <SkillCard skill={lesson.skill} />

      <section aria-label="Validation du kata" className="flex flex-col gap-4 border-t-[3px] border-ink pt-6">
        {done ? (
          <div className="flex flex-wrap items-center gap-3">
            <Hanko />
            <p className="font-semibold">Kata validé. {lesson.exercise.achievement}</p>
            <Button
              variant="ghost"
              disabled={toggle.isPending}
              onClick={() => toggle.mutate({ lessonId: lesson.id, completed: false })}
            >
              Annuler la validation
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button disabled={!checklistComplete || progress.isPending || toggle.isPending} onClick={validate}>
              {toggle.isPending ? "Validation…" : "Valider le kata"}
            </Button>
            <p className="font-mono text-[11px] text-ink-soft">
              {checklistComplete
                ? "CHECKLIST COMPLÈTE"
                : `${checkedSaved} / ${checklistSize} COCHÉS ET ENREGISTRÉS · COCHE TOUTE LA CHECKLIST POUR VALIDER`}
            </p>
          </div>
        )}
        {toggle.isError && <Alert>La validation n&apos;a pas pu être enregistrée. Vérifie ta connexion et réessaie.</Alert>}
        <div className="flex flex-wrap justify-between gap-2">
          {prev ? (
            <Link href={lessonPath(prev)} className={buttonClass("ghost")}>
              ← Kata {prev.index + 1}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={lessonPath(next)} className={buttonClass("secondary")}>
              Kata {next.index + 1} →
            </Link>
          )}
        </div>
      </section>

      {celebration && (
        <CelebrationDialog
          celebration={celebration}
          kataLabel={kataLabel}
          nextHref={next ? lessonPath(next) : undefined}
          onClose={() => setCelebration(null)}
        />
      )}
    </article>
  );
}
