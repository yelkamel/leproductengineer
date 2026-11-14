import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import { ensureProfile } from "./learning";
import type { LoginValues, SignupValues } from "./auth-schemas";

export async function signUp({ displayName, email, password }: SignupValues) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName });
  await ensureProfile(user.uid, { displayName, email });
}

export async function signIn({ email, password }: LoginValues) {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle() {
  const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
  await ensureProfile(user.uid, { displayName: user.displayName ?? "", email: user.email ?? "" });
}

export function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

export function signOut() {
  return fbSignOut(auth);
}
