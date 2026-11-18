import { rankOf, totalLessons } from "@lpe/curriculum";
import { Belt, Case, Knot, Notches } from "@lpe/ui";

/** Ta ceinture, calculée depuis le nombre de katas validés, et les crans vers la suivante. */
export function RankCard({ validated }: { validated: number }) {
  const rank = rankOf(validated);
  const remaining = rank.notches.total - rank.notches.done;
  return (
    <Case className="flex flex-col gap-3 p-4">
      <div className="flex justify-between font-mono text-[11px] text-ink-soft">
        <span>TA CEINTURE</span>
        <span>
          {validated} / {totalLessons} KATAS
        </span>
      </div>
      <p className="font-title text-[26px] leading-none font-black italic uppercase">{rank.belt.label}</p>
      <div className="flex items-center">
        <Belt id={rank.belt.id} className="h-5 flex-1" />
        <Knot className="-ml-1 h-7 w-[42px] flex-none text-ink" />
      </div>
      {rank.next ? (
        <Notches done={rank.notches.done} total={rank.notches.total}>
          {remaining === 1 ? "Encore 1 kata" : `Encore ${remaining} katas`} vers la {rank.next.label.toLowerCase()}
        </Notches>
      ) : (
        <p className="font-letter text-[13px] font-bold">Tous les katas sont validés.</p>
      )}
    </Case>
  );
}
