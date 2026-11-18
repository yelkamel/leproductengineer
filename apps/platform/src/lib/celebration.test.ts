import { totalLessons } from "@lpe/curriculum";
import { describe, expect, it } from "vitest";
import { celebrationFor } from "./celebration";

describe("celebrationFor", () => {
  it("dit « Oss » et ce qui reste quand la ceinture ne change pas", () => {
    expect(celebrationFor(2, 3, "Ton problème est formulé.")).toEqual({
      kind: "oss",
      achievement: "Ton problème est formulé.",
      next: expect.objectContaining({ id: "orange" }),
      remaining: 1,
    });
  });

  it("remplace le « Oss » par le passage quand la ceinture change", () => {
    expect(celebrationFor(3, 4, "Ton premier incrément est choisi.")).toMatchObject({
      kind: "belt",
      belt: { id: "orange" },
      final: false,
    });
  });

  it("annonce la noire au dernier kata", () => {
    expect(celebrationFor(totalLessons - 1, totalLessons, "Ton dossier de livraison est prêt.")).toMatchObject({
      kind: "belt",
      belt: { id: "noire" },
      final: true,
    });
  });
});
