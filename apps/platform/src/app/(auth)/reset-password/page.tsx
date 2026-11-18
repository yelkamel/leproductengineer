"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Alert, Button, Field } from "@/components/ui";
import { resetPassword } from "@/lib/auth-actions";
import { authErrorMessage, resetSchema, type ResetValues } from "@/lib/auth-schemas";

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ResetValues>({ resolver: zodResolver(resetSchema) });

  const onSubmit = handleSubmit(async ({ email }) => {
    try {
      await resetPassword(email);
    } catch (e) {
      // On ne dit pas si le compte existe : même message de succès pour un e-mail inconnu.
      const code = typeof e === "object" && e && "code" in e ? String(e.code) : "";
      if (code !== "auth/user-not-found") {
        setError("root", { message: authErrorMessage(e) });
        throw e;
      }
    }
  });

  return (
    <>
      <h1 className="bd-h2 mb-2">Mot de passe oublié</h1>
      <p className="mb-6 text-sm text-ink-soft">On t&apos;envoie un lien pour en choisir un nouveau.</p>
      {isSubmitSuccessful ? (
        <Alert tone="success">Si un compte existe pour cet e-mail, le lien vient de partir.</Alert>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
          <Field id="email" label="E-mail" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
          {errors.root && <Alert>{errors.root.message}</Alert>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Envoi…" : "Envoyer le lien"}
          </Button>
        </form>
      )}
      <p className="mt-6 text-center text-sm">
        <Link href="/login/" className="bd-link font-normal">
          Retour à la connexion
        </Link>
      </p>
    </>
  );
}
