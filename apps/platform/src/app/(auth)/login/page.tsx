"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Divider, GoogleButton } from "@/components/google-button";
import { Alert, Button, Field } from "@/components/ui";
import { signIn } from "@/lib/auth-actions";
import { authErrorMessage, loginSchema, type LoginValues } from "@/lib/auth-schemas";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signIn(values);
    } catch (e) {
      setError("root", { message: authErrorMessage(e) });
    }
  });

  return (
    <>
      <h1 className="mb-1 text-xl font-semibold">Connexion</h1>
      <p className="mb-6 text-sm text-muted">Reprends là où tu t&apos;étais arrêté.</p>
      <GoogleButton />
      <Divider />
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <Field id="email" label="E-mail" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <Field
          id="password"
          label="Mot de passe"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />
        {errors.root && <Alert>{errors.root.message}</Alert>}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Connexion…" : "Se connecter"}
        </Button>
      </form>
      <div className="mt-6 flex justify-between text-sm">
        <Link href="/reset-password/" className="text-muted hover:text-foreground">
          Mot de passe oublié
        </Link>
        <Link href="/signup/" className="font-medium text-accent">
          Créer un compte
        </Link>
      </div>
    </>
  );
}
