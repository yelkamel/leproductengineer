import { describe, expect, it } from "vitest";
import {
  adjacentLessons,
  allLessons,
  curriculum,
  findLesson,
  moduleProgress,
  nextUnfinishedLesson,
  skillMarkdown,
  stats,
} from "./index";

describe("curriculum", () => {
  it("has an introduction and three modules, in order", () => {
    expect(curriculum.map((m) => m.slug)).toEqual(["introduction", "produit", "design", "tech"]);
    expect(stats.modules).toBe(3);
  });

  it("uses globally unique lesson, exercise and skill ids", () => {
    const unique = (xs: string[]) => new Set(xs).size === xs.length;
    expect(unique(allLessons.map((r) => r.lesson.id))).toBe(true);
    expect(unique(allLessons.map((r) => r.lesson.exercise.id))).toBe(true);
    expect(unique(allLessons.map((r) => r.lesson.skill.name))).toBe(true);
  });

  it("finds a lesson by its slugs", () => {
    const ref = findLesson("produit", "le-vrai-probleme");
    expect(ref?.lesson.id).toBe("produit-probleme");
    expect(findLesson("produit", "nope")).toBeUndefined();
  });

  it("links lessons across module boundaries", () => {
    const lastIntro = curriculum[0]!.lessons.at(-1)!;
    const { next } = adjacentLessons(lastIntro.id);
    expect(next?.module.slug).toBe("produit");
    expect(adjacentLessons(allLessons[0]!.lesson.id).prev).toBeUndefined();
    expect(adjacentLessons(allLessons.at(-1)!.lesson.id).next).toBeUndefined();
  });

  it("computes progress and the next lesson to resume", () => {
    const first = allLessons[0]!.lesson.id;
    const done = new Set([first]);
    expect(nextUnfinishedLesson(done)?.index).toBe(1);
    expect(moduleProgress(curriculum[0]!, done)).toMatchObject({ done: 1, total: 2 });
    expect(nextUnfinishedLesson(new Set(allLessons.map((r) => r.lesson.id)))).toBeUndefined();
  });

  it("renders a SKILL.md with frontmatter", () => {
    const md = skillMarkdown(allLessons[0]!.lesson.skill);
    expect(md.startsWith("---\nname: pe-role-check\ndescription: ")).toBe(true);
  });
});
