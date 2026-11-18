/*
 * Molecules de la plateforme, posées sur le thème partagé (@lpe/ui).
 * Aucune valeur de style ici : tout vient des classes bd-* et des tokens du thème.
 */
import { Button as BdButton, buttonClass as bdButtonClass, type ButtonVariant } from "@lpe/ui";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export function buttonClass(variant: ButtonVariant = "primary", extra = "", small = false) {
  return bdButtonClass(variant, { small, className: extra });
}

export function Button({
  variant = "primary",
  small = false,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; small?: boolean }) {
  return <BdButton variant={variant} small={small} type={type} {...props} />;
}

export function Field({
  label,
  error,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; id: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="bd-label">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="bd-input"
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function Alert({ children, tone = "danger" }: { children: ReactNode; tone?: "danger" | "success" }) {
  return (
    <p
      role={tone === "danger" ? "alert" : "status"}
      className={`rounded-[4px] border-2 px-3 py-2 text-sm font-medium ${
        tone === "danger" ? "border-error bg-error-pale text-error" : "border-ink bg-amber-pale text-ink"
      }`}
    >
      {children}
    </p>
  );
}

export function Spinner({ label = "Chargement" }: { label?: string }) {
  return (
    <div role="status" className="flex items-center justify-center p-12 font-letter text-sm font-bold text-ink-soft">
      <span className="mr-2 inline-block size-4 animate-spin rounded-full border-[3px] border-sky-deep border-t-ink" />
      {label}…
    </div>
  );
}

/** Le séparateur « ou » entre Google et l'e-mail. */
export function Divider() {
  return (
    <div className="my-5 flex items-center gap-3 font-mono text-xs text-ink-soft">
      <span className="h-0.5 flex-1 bg-sky-deep" />
      ou
      <span className="h-0.5 flex-1 bg-sky-deep" />
    </div>
  );
}
