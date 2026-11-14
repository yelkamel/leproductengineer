import type { Video } from "@lpe/curriculum";

/** Vidéo prête : l'iframe. Sinon : un placeholder qui montre les notes de préparation. */
export function VideoBlock({ video, title }: { video: Video; title: string }) {
  if (video.status === "ready") {
    return (
      <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-black">
        <iframe
          src={video.embedUrl}
          title={title}
          className="size-full"
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  const { prep } = video;
  return (
    <div className="overflow-hidden rounded-2xl border border-dashed border-border bg-surface">
      <div className="flex aspect-video flex-col items-center justify-center gap-2 bg-foreground/[0.03] p-6 text-center">
        <span aria-hidden className="text-4xl">🎬</span>
        <p className="font-medium">Vidéo en préparation</p>
        <p className="text-sm text-muted">Environ {video.targetMinutes} minutes</p>
        <p className="mt-2 max-w-md text-balance text-sm italic">« {prep.hook} »</p>
      </div>
      <details className="group border-t border-border p-5 text-sm">
        <summary className="cursor-pointer font-medium marker:text-muted">Notes de préparation</summary>
        <dl className="mt-4 flex flex-col gap-4">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">Points clés</dt>
            <dd>
              <ol className="mt-1 list-decimal space-y-1 pl-5">
                {prep.keyPoints.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">Histoire à raconter</dt>
            <dd className="mt-1">{prep.story}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">À retenir</dt>
            <dd className="mt-1 font-medium">{prep.takeaway}</dd>
          </div>
        </dl>
      </details>
    </div>
  );
}
