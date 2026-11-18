"use client";

import { Case, Logo } from "@lpe/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Spinner } from "@/components/ui";
import { isHardRedirectPending } from "@/lib/auth-actions";
import { useAuth } from "@/lib/auth-context";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    // An email/password submit finishes with a full page load (see auth-actions).
    if (auth.status === "signed-in" && !isHardRedirectPending()) router.replace("/dashboard/");
  }, [auth.status, router]);

  // Keep the form mounted until that page load so password managers can still read it.
  if (auth.status !== "signed-out" && !isHardRedirectPending()) return <Spinner />;

  return (
    <main className="bd-sky flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <Link href="/login/" className="mb-8 flex justify-center">
          <Logo />
        </Link>
        <Case className="p-6">{children}</Case>
      </div>
    </main>
  );
}
