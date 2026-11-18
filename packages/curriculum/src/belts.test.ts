import { describe, expect, it } from "vitest";
import { beltLadder, rankFor } from "./belts";
import { beltAtEndOf, belts, curriculum, rankOf, tomeName, totalLessons } from "./index";

describe("ceintures", () => {
  it("donne sept ceintures unies, la noire au dernier kata", () => {
    expect(belts.map((b) => b.id)).toEqual(["blanche", "jaune", "orange", "verte", "bleue", "marron", "noire"]);
    expect(belts.map((b) => b.from)).toEqual([0, 2, 4, 6, 8, 10, totalLessons]);
  });

  it("calcule le rang et les crans vers la ceinture suivante", () => {
    expect(rankOf(0)).toMatchObject({ belt: { id: "blanche" }, next: { id: "jaune" }, notches: { done: 0, total: 2 } });
    expect(rankOf(3)).toMatchObject({ belt: { id: "jaune" }, next: { id: "orange" }, notches: { done: 1, total: 2 } });
    expect(rankOf(4).belt.id).toBe("orange");
    expect(rankOf(10)).toMatchObject({ belt: { id: "marron" }, notches: { done: 0, total: totalLessons - 10 } });
    expect(rankOf(totalLessons)).toEqual({ belt: belts.at(-1), notches: { done: 0, total: 0 } });
  });

  it("borne les valeurs hors programme", () => {
    expect(rankOf(-2).belt.id).toBe("blanche");
    expect(rankOf(totalLessons + 5).belt.id).toBe("noire");
  });

  it("garde des seuils croissants si le programme grandit", () => {
    const ladder = beltLadder(14);
    expect(ladder.at(-1)!.from).toBe(14);
    expect(rankFor(13, ladder).belt.id).toBe("marron");
    expect(() => beltLadder(5)).toThrow();
  });

  it("annonce la ceinture de fin de chaque tome", () => {
    expect(curriculum.map((m) => beltAtEndOf(m).id)).toEqual(["jaune", "orange", "bleue", "noire"]);
  });

  it("donne un nom court à chaque tome", () => {
    expect(curriculum.map(tomeName)).toEqual(["Introduction", "Produit", "Design", "Tech"]);
  });
});
