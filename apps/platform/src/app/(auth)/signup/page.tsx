"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Divider, GoogleButton } from "@/components/google-button";
import { Alert, Button, Field } from "@/components/ui";
import { signUp } from "@/lib/auth-actions";
import { authErrorMessage, signupSchema, type SignupValues } from "@/lib/auth-schemas";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({ resolver: zodResolver(signupSchema) });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signUp(values);
    } catch (e) {
      setError("root", { message: authErrorMessage(e) });
    }
  });

  return (
    <>
      <h1 className="bd-h2 mb-2">Créer ton compte</h1>
      <p className="mb-6 text-sm text-ink-soft">Gratuit. Accès immédiat aux quatre tomes. Tu commences ceinture blanche.</p>
      <GoogleButton />
      <Divider />
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <Field id="displayName" label="Prénom" autoComplete="given-name" error={errors.displayName?.message} {...register("displayName")} />
        <Field id="email" label="E-mail" type="email" autoComplete="username" error={errors.email?.message} {...register("email")} />
        <Field
          id="password"
          label="Mot de passe"
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Field
          id="confirm"
          label="Confirme le mot de passe"
          type="password"
          autoComplete="new-password"
          error={errors.confirm?.message}
          {...register("confirm")}
        />
        {errors.root && <Alert>{errors.root.message}</Alert>}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Création…" : "Créer mon compte"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-ink-soft">
        Déjà inscrit ?{" "}
        <Link href="/login/" className="bd-link">
          Se connecter
        </Link>
      </p>
    </>
  );
}
