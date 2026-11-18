/**
 * Les ceintures : la progression propre à la formation.
 *
 * Un kata = une leçon validée. Sept ceintures unies, jamais bicolores. La blanche au départ,
 * puis une nouvelle couleur tous les deux katas, et la noire au dernier kata du programme.
 * Le rang est toujours calculé depuis le nombre de katas validés : rien n'est stocké.
 */

export const BELT_IDS = ["blanche", "jaune", "orange", "verte", "bleue", "marron", "noire"] as const;
export type BeltId = (typeof BELT_IDS)[number];

export interface Belt {
  id: BeltId;
  /** Nom affiché (« Orange »). */
  label: string;
  /** Nombre de katas validés à partir duquel on la porte. */
  from: number;
}

export interface Rank {
  belt: Belt;
  /** La ceinture suivante, absente quand on porte la noire. */
  next?: Belt;
  /** Crans posés vers la ceinture suivante, et crans nécessaires. */
  notches: { done: number; total: number };
}

const LABELS: Record<BeltId, string> = {
  blanche: "Blanche",
  jaune: "Jaune",
  orange: "Orange",
  verte: "Verte",
  bleue: "Bleue",
  marron: "Marron",
  noire: "Noire",
};

/** Seuils : 0, 2, 4, 6, 8, 10 katas, puis la noire au dernier kata. */
export function beltLadder(totalKatas: number): readonly Belt[] {
  const last = BELT_IDS.length - 1;
  if (totalKatas < last * 2 - 1) {
    throw new Error(`Il faut au moins ${last * 2 - 1} katas pour ${BELT_IDS.length} ceintures.`);
  }
  return BELT_IDS.map((id, i) => ({ id, label: LABELS[id], from: i === last ? totalKatas : i * 2 }));
}

export function rankFor(validatedKatas: number, ladder: readonly Belt[]): Rank {
  const count = Math.max(0, validatedKatas);
  let i = 0;
  while (i + 1 < ladder.length && count >= ladder[i + 1]!.from) i++;
  const belt = ladder[i]!;
  const next = ladder[i + 1];
  if (!next) return { belt, notches: { done: 0, total: 0 } };
  return { belt, next, notches: { done: count - belt.from, total: next.from - belt.from } };
}
