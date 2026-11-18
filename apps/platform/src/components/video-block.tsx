import type { Video } from "@lpe/curriculum";
import { Bulle, Case, Recit } from "@lpe/ui";

/** Vidéo prête : l'iframe. Sinon : une case qui annonce la vidéo et montre les notes de préparation. */
export function VideoBlock({ video, title }: { video: Video; title: string }) {
  if (video.status === "ready") {
    return (
      <Case className="aspect-video bg-ink">
        <iframe
          src={video.embedUrl}
          title={title}
          className="size-full"
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </Case>
    );
  }

  const { prep } = video;
  return (
    <Case>
      <div className="bd-sky relative flex min-h-64 flex-col items-start justify-end gap-4 p-5 sm:aspect-[16/7]">
        <div className="bd-trame absolute inset-0" aria-hidden />
        <Recit className="relative">Vidéo en préparation · environ {video.targetMinutes} min</Recit>
        <Bulle className="relative max-w-[52ch] text-[15px]">{prep.hook}</Bulle>
      </div>
      <details className="border-t-[3px] border-ink p-5 text-[15px]">
        <summary className="cursor-pointer font-semibold">Notes de préparation</summary>
        <dl className="mt-4 flex flex-col gap-4">
          <div>
            <dt className="bd-label">Points clés</dt>
            <dd>
              <ol className="mt-1 list-decimal space-y-1 pl-5">
                {prep.keyPoints.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            </dd>
          </div>
          <div>
            <dt className="bd-label">Histoire à raconter</dt>
            <dd className="mt-1">{prep.story}</dd>
          </div>
          <div>
            <dt className="bd-label">À retenir</dt>
            <dd className="mt-1 font-semibold">{prep.takeaway}</dd>
          </div>
        </dl>
      </details>
    </Case>
  );
}
