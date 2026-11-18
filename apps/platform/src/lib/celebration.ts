import { rankOf, type Belt } from "@lpe/curriculum";

/**
 * Ce que montre l'écran de célébration après un kata validé.
 * Un seul temps fort par kata : quand la ceinture change, le passage remplace le « Oss ! ».
 */
export type Celebration =
  | { kind: "oss"; achievement: string; next: Belt; remaining: number }
  | { kind: "belt"; achievement: string; belt: Belt; final: boolean };

export function celebrationFor(validatedBefore: number, validatedAfter: number, achievement: string): Celebration {
  const before = rankOf(validatedBefore);
  const after = rankOf(validatedAfter);
  if (after.belt.id !== before.belt.id) {
    return { kind: "belt", achievement, belt: after.belt, final: !after.next };
  }
  // Pas de changement de ceinture : il reste forcément une ceinture suivante.
  const next = after.next!;
  return { kind: "oss", achievement, next, remaining: after.notches.total - after.notches.done };
}
