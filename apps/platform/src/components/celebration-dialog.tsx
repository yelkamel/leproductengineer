"use client";

import { Belt, Bulle, buttonClass, Oss, Recit } from "@lpe/ui";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Celebration } from "@/lib/celebration";

/**
 * Le temps fort, en case pleine page, après un kata validé.
 * Un seul par kata : « Oss ! », ou le passage de ceinture quand la couleur change.
 */
export function CelebrationDialog({
  celebration,
  kataLabel,
  nextHref,
  onClose,
}: {
  celebration: Celebration;
  kataLabel: string;
  nextHref?: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal?.();
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="celebration-title"
      onClose={onClose}
      className="m-auto w-[min(640px,calc(100vw-32px))] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-ink/60"
    >
      <div className="bd-case bd-sky bd-case-act">
        <div className="relative h-52 border-b-[3px] border-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/illustrations/guide-portrait.jpg"
            alt=""
            width={560}
            height={700}
            // Bandeau centré sur le visage et le tampon : ni le titre ni la signature du visuel provisoire.
            className="bd-art absolute inset-0 [object-position:50%_44%] sm:[object-position:50%_36%]"
          />
        </div>
        <div className="flex flex-col items-start gap-4 bg-paper p-5">
          <Recit>{kataLabel}</Recit>
          {celebration.kind === "belt" ? (
            <>
              <h2 id="celebration-title">
                <Oss className="text-[34px]">Ceinture {celebration.belt.label.toLowerCase()}</Oss>
              </h2>
              <Belt id={celebration.belt.id} className="h-[18px] w-full max-w-56" />
              <p className="border-[2.5px] border-ink bg-paper px-2.5 py-1.5 font-semibold">{celebration.achievement}</p>
              {celebration.final && (
                <Bulle>Ton dossier, tu peux le montrer en entretien. C&apos;est toi qui l&apos;as construit, kata par kata.</Bulle>
              )}
            </>
          ) : (
            <>
              <h2 id="celebration-title">
                <Oss />
              </h2>
              <p className="border-[2.5px] border-ink bg-paper px-2.5 py-1.5 font-semibold">{celebration.achievement}</p>
              <Bulle>
                Un cran de plus. Encore {celebration.remaining === 1 ? "un kata" : `${celebration.remaining} katas`} et tu
                passes <b>{celebration.next.label.toLowerCase()}</b>.
              </Bulle>
            </>
          )}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {nextHref && (
              <Link href={nextHref} className={buttonClass("primary")} onClick={onClose}>
                Kata suivant
              </Link>
            )}
            <button type="button" className={buttonClass("ghost")} onClick={() => ref.current?.close()} autoFocus={!nextHref}>
              Rester sur ce kata
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
