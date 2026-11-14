"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui";
import { useAuth } from "@/lib/auth-context";

export default function Home() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.status === "signed-in") router.replace("/dashboard/");
    if (auth.status === "signed-out") router.replace("/login/");
  }, [auth.status, router]);

  return <Spinner />;
}
