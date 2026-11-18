import { curriculum as rawCurriculum } from "./content";
import { beltLadder, rankFor } from "./belts";
import { curriculumSchema, type Lesson, type Module, type Skill } from "./schema";

export * from "./belts";
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

/** Les sept ceintures du programme (un kata = une leçon validée). */
export const belts = beltLadder(totalLessons);

/** Le rang de l'apprenant à partir du nombre de katas validés. */
export function rankOf(validatedKatas: number) {
  return rankFor(validatedKatas, belts);
}

/** Numéro de tome d'un module (l'introduction est le tome 1). */
export function tomeNumber(module: Pick<Module, "order">): number {
  return module.order + 1;
}

/** Nom court du tome (« Produit »), sinon son kicker (« Introduction »). */
export function tomeName(module: Pick<Module, "title" | "kicker">): string {
  const [head, ...rest] = module.title.split(" : ");
  return rest.length ? head! : module.kicker;
}

/** La ceinture qu'on porte en fermant le tome, si on a validé tous les katas jusque-là. */
export function beltAtEndOf(module: Module) {
  const last = module.lessons.at(-1)!;
  const ref = allLessons.find((r) => r.lesson.id === last.id)!;
  return rankOf(ref.index + 1).belt;
}

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
