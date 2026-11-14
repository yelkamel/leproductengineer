"use client";

import { adjacentLessons, findLesson, lessonPath } from "@lpe/curriculum";
import Link from "next/link";
import { useUser } from "@/lib/auth-context";
import { useProgress, useToggleLessonComplete } from "@/lib/learning";
import { ExerciseForm } from "./exercise-form";
import { SkillCard } from "./skill-card";
import { Alert, Button, buttonClass } from "./ui";
import { VideoBlock } from "./video-block";

export function LessonView({ moduleSlug, lessonSlug }: { moduleSlug: string; lessonSlug: string }) {
  const user = useUser();
  const progress = useProgress(user.uid);
  const toggle = useToggleLessonComplete(user.uid);

  const ref = findLesson(moduleSlug, lessonSlug);
  if (!ref) return <Alert>Leçon introuvable.</Alert>;

  const { module, lesson } = ref;
  const { prev, next } = adjacentLessons(lesson.id);
  const done = progress.data?.has(lesson.id) ?? false;

  return (
    <article className="flex flex-col gap-6">
      <nav aria-label="Fil d'Ariane" className="text-sm text-muted">
        <Link href="/dashboard/" className="hover:text-foreground">
          Tableau de bord
        </Link>{" "}
        / {module.kicker}
      </nav>
      <header>
        <h1 className="text-2xl font-semibold text-balance">{lesson.title}</h1>
        <p className="mt-2 text-muted">{lesson.summary}</p>
      </header>

      <VideoBlock video={lesson.video} title={lesson.title} />
      <ExerciseForm key={lesson.exercise.id} exercise={lesson.exercise} lessonId={lesson.id} />
      <SkillCard skill={lesson.skill} />

      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
        <Button
          variant={done ? "secondary" : "primary"}
          disabled={progress.isPending || toggle.isPending}
          onClick={() => toggle.mutate({ lessonId: lesson.id, completed: !done })}
        >
          {done ? "✓ Leçon terminée (annuler)" : "Marquer comme terminée"}
        </Button>
        {toggle.isError && <Alert>La progression n&apos;a pas pu être enregistrée.</Alert>}
        <div className="flex gap-2">
          {prev && (
            <Link href={lessonPath(prev)} className={buttonClass("ghost")}>
              ← Précédente
            </Link>
          )}
          {next && (
            <Link href={lessonPath(next)} className={buttonClass("secondary")}>
              Suivante →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
