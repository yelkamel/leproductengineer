import { curriculum as rawCurriculum } from "./content";
import { curriculumSchema, type Lesson, type Module, type Skill } from "./schema";

export * from "./schema";

/** Programme validé au chargement : une erreur de contenu casse le build, pas la prod. */
export const curriculum: readonly Module[] = curriculumSchema
  .parse(rawCurriculum)
  .sort((a, b) => a.order - b.order);

export interface LessonRef {
  module: Module;
  lesson: Lesson;
  /** Position globale, 0-based, dans le parcours complet. */
  index: number;
}

/** Toutes les leçons dans l'ordre du parcours. */
export const allLessons: readonly LessonRef[] = curriculum.flatMap((module) =>
  module.lessons.map((lesson) => ({ module, lesson })),
).map((ref, index) => ({ ...ref, index }));

export const totalLessons = allLessons.length;

export function findModule(moduleSlug: string): Module | undefined {
  return curriculum.find((m) => m.slug === moduleSlug);
}

export function findLesson(moduleSlug: string, lessonSlug: string): LessonRef | undefined {
  return allLessons.find((r) => r.module.slug === moduleSlug && r.lesson.slug === lessonSlug);
}

export function adjacentLessons(lessonId: string): { prev?: LessonRef; next?: LessonRef } {
  const i = allLessons.findIndex((r) => r.lesson.id === lessonId);
  if (i === -1) return {};
  return { prev: allLessons[i - 1], next: allLessons[i + 1] };
}

export function lessonPath(ref: Pick<LessonRef, "module" | "lesson">): string {
  return `/learn/${ref.module.slug}/${ref.lesson.slug}`;
}

/** Première leçon non terminée, ou undefined si tout est fini. */
export function nextUnfinishedLesson(completedIds: ReadonlySet<string>): LessonRef | undefined {
  return allLessons.find((r) => !completedIds.has(r.lesson.id));
}

export function moduleProgress(module: Module, completedIds: ReadonlySet<string>) {
  const done = module.lessons.filter((l) => completedIds.has(l.id)).length;
  return { done, total: module.lessons.length, ratio: done / module.lessons.length };
}

/** Le fichier SKILL.md complet, prêt à poser dans `.claude/skills/<name>/SKILL.md`. */
export function skillMarkdown(skill: Skill): string {
  return `---\nname: ${skill.name}\ndescription: ${skill.description}\n---\n\n${skill.body}\n`;
}

export const stats = {
  modules: curriculum.filter((m) => m.order > 0).length,
  lessons: totalLessons,
  exercises: totalLessons,
  skills: totalLessons,
  plannedMinutes: allLessons.reduce(
    (sum, r) =>
      sum + (r.lesson.video.status === "ready" ? r.lesson.video.minutes : r.lesson.video.targetMinutes),
    0,
  ),
} as const;
