"use client";

import { Logo } from "@lpe/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Button, Spinner } from "@/components/ui";
import { signOut } from "@/lib/auth-actions";
import { useAuth } from "@/lib/auth-context";

export default function AppLayout({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.status === "signed-out") router.replace("/login/");
  }, [auth.status, router]);

  if (auth.status !== "signed-in") return <Spinner />;

  return (
    <>
      <header className="bd-sky sticky top-0 z-10 border-b-[3px] border-ink">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/dashboard/" aria-label="Le dojo, tableau de bord">
            <Logo>Le dojo</Logo>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <span className="hidden font-letter font-bold sm:inline">{auth.user.displayName ?? auth.user.email}</span>
            <Button variant="ghost" onClick={() => signOut()}>
              Déconnexion
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
    </>
  );
}
