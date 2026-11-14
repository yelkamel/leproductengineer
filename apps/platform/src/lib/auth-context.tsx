"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "./firebase";

type AuthState = { status: "loading" } | { status: "signed-out" } | { status: "signed-in"; user: User };

const AuthContext = createContext<AuthState>({ status: "loading" });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) =>
        setState(user ? { status: "signed-in", user } : { status: "signed-out" }),
      ),
    [],
  );

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  return useContext(AuthContext);
}

/** À utiliser sous <RequireAuth> uniquement. */
export function useUser(): User {
  const state = useAuth();
  if (state.status !== "signed-in") throw new Error("useUser() called outside of a signed-in area");
  return state.user;
}
