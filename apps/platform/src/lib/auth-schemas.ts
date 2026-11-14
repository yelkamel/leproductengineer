import { z } from "zod";

const email = z.email("Adresse e-mail invalide.");
const password = z.string().min(8, "8 caractères minimum.");

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Mot de passe requis."),
});

export const signupSchema = z
  .object({
    displayName: z.string().trim().min(2, "2 caractères minimum.").max(60, "60 caractères maximum."),
    email,
    password,
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, {
    path: ["confirm"],
    message: "Les mots de passe ne correspondent pas.",
  });

export const resetSchema = z.object({ email });

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;
export type ResetValues = z.infer<typeof resetSchema>;

/** Traduit les codes d'erreur Firebase Auth en messages lisibles. */
export function authErrorMessage(error: unknown): string {
  const code =
    typeof error === "object" && error !== null && "code" in error ? String(error.code) : "";
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "E-mail ou mot de passe incorrect.";
    case "auth/email-already-in-use":
      return "Un compte existe déjà avec cet e-mail. Connecte-toi.";
    case "auth/weak-password":
      return "Mot de passe trop faible.";
    case "auth/too-many-requests":
      return "Trop de tentatives. Réessaie dans quelques minutes.";
    case "auth/network-request-failed":
      return "Pas de connexion réseau. Vérifie ta connexion et réessaie.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Connexion annulée.";
    default:
      return "Une erreur est survenue. Réessaie.";
  }
}
