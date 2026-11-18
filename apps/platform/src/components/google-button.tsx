"use client";

import { useState } from "react";
import { signInWithGoogle } from "@/lib/auth-actions";
import { authErrorMessage } from "@/lib/auth-schemas";
import { Alert, Button } from "./ui";

export function GoogleButton() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setPending(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (e) {
      setError(authErrorMessage(e));
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Button type="button" variant="secondary" onClick={onClick} disabled={pending}>
        Continuer avec Google
      </Button>
      {error && <Alert>{error}</Alert>}
    </div>
  );
}

export { Divider } from "./ui";
