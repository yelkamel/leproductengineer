/*
 * Composants « Dojo BD » partagés par la landing et la plateforme.
 * Purement présentationnels : pas d'état, pas de données. Le style vit dans ../theme.css.
 */
import type { BeltId } from "@lpe/curriculum";
import type { ButtonHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode } from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ---------- Case ---------- */

export function Case({
  act = false,
  sky = false,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  /** L'ombre en aplat : réservée à la seule chose à faire maintenant. */
  act?: boolean;
  /** Fond ciel au lieu du papier. */
  sky?: boolean;
}) {
  return <div className={cx("bd-case", act && "bd-case-act", sky && "bd-sky", className)} {...props} />;
}

/* ---------- Textes BD ---------- */

/** Le contexte : où tu es, ce qu'on attend de toi. */
export function Recit({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx("bd-recit", className)} {...props} />;
}

/** La voix de Youcef, ton guide. Une ou deux phrases, jamais un cours entier. */
export function Bulle({
  tail = "down",
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { tail?: "down" | "left" }) {
  return <div className={cx("bd-bulle", tail === "left" && "bd-bulle-left", className)} {...props} />;
}

/** La réussite, et rien d'autre. Une seule par écran. */
export function Oss({ children = "Oss !", className, style }: { children?: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <span className={cx("bd-oss bd-pop", className)} style={style}>
      {children}
    </span>
  );
}

/** Le tampon du kata validé. */
export function Hanko({ label = "Kata validé" }: { label?: string }) {
  return (
    <span className="bd-hanko" role="img" aria-label={label}>
      <span aria-hidden lang="ja">
        型
      </span>
    </span>
  );
}

/** L'emplacement vide d'un tampon. */
export function Slot() {
  return <span className="bd-slot" aria-hidden />;
}

/* ---------- Fiche demande ---------- */

export function Fiche({
  from,
  note,
  struck = false,
  className,
  children,
}: {
  /** Ce qu'est la fiche (« Demande · client »). */
  from: string;
  /** Annotation manuscrite : une question ou une décision, jamais une décoration. */
  note?: ReactNode;
  /** Barre le contenu, quand il a été remis en question. */
  struck?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("bd-fiche", className)}>
      <span className="bd-fiche-from">{from}</span>
      {struck ? <s>{children}</s> : children}
      {note && <span className="bd-fiche-note">{note}</span>}
    </div>
  );
}

/* ---------- Ceinture ---------- */

export function Belt({ id, className, style }: { id: BeltId; className?: string; style?: CSSProperties }) {
  return (
    <div
      aria-hidden
      className={cx("bd-belt", id === "noire" && "bd-belt-noire", className)}
      style={{ "--belt": `var(--belt-${id})`, ...style } as CSSProperties}
    />
  );
}

/** Les crans posés vers la ceinture suivante. */
export function Notches({ done, total, children }: { done: number; total: number; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 font-letter text-[13px] font-bold">
      {Array.from({ length: total }, (_, i) => (
        <span key={i} aria-hidden className={cx("bd-notch", i < done && "bd-notch-on")} />
      ))}
      {children && <span className="ml-1">{children}</span>}
    </div>
  );
}

/** Le nœud de ceinture : l'emblème, à côté du nom. */
export function Knot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" aria-hidden className={cx("h-[22px] w-[34px] fill-current", className)}>
      <rect x="0" y="9" width="24" height="12" />
      <rect x="36" y="9" width="24" height="12" />
      <rect x="21" y="6" width="18" height="18" rx="2" />
      <path d="M24 22 L16 40 L25 40 L30 25 Z" />
      <path d="M36 22 L44 40 L35 40 L30 25 Z" />
    </svg>
  );
}

export function Logo({ children = "Le Product Engineer" }: { children?: ReactNode }) {
  return (
    <span className="flex items-center gap-2 font-title text-base font-black italic uppercase leading-none">
      <Knot />
      {children}
    </span>
  );
}

/* ---------- Boutons ---------- */

export type ButtonVariant = "primary" | "secondary" | "ghost";

export function buttonClass(variant: ButtonVariant = "primary", { small = false, className }: { small?: boolean; className?: string } = {}) {
  return cx("bd-btn", `bd-btn-${variant}`, small && "bd-btn-sm", className);
}

export function Button({
  variant = "primary",
  small = false,
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; small?: boolean }) {
  return <button type={type} className={buttonClass(variant, { small, className })} {...props} />;
}

/* ---------- Le guide ---------- */

/** Youcef parle : son portrait dans une petite case, sa phrase dans une bulle. */
export function GuideSays({
  src,
  alt = "Youcef, ton guide",
  size = 92,
  children,
}: {
  src: string;
  alt?: string;
  size?: number;
  children: ReactNode;
}) {
  return (
    <div className="grid items-end gap-2.5" style={{ gridTemplateColumns: `${size}px minmax(0, 1fr)` }}>
      <div className="bd-case aspect-square">
        <img
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="bd-art"
          // Cadre serré sur le visage : les visuels provisoires portent un titre en haut et une signature en bas.
          style={{ objectPosition: "50% 0%", transform: "scale(2)", transformOrigin: "50% 56%" }}
        />
      </div>
      <Bulle tail="left">{children}</Bulle>
    </div>
  );
}
