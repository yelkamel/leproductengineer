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

type PasswordCredentialCtor = new (data: { id: string; password: string; name?: string }) => Credential;

/**
 * Explicitly hands the pair to the browser's own password manager (Chromium's
 * Credential Management API). Firebase signs in over XHR, so the browser's
 * "save password?" heuristics may never fire on their own. No-op where the API is
 * missing (Safari, Firefox). Capped so a slow prompt never blocks the redirect.
 */
async function storeCredential(id: string, password: string, name?: string) {
  const Ctor = (window as unknown as { PasswordCredential?: PasswordCredentialCtor }).PasswordCredential;
  if (!Ctor || !navigator.credentials?.store) return;
  await Promise.race([
    navigator.credentials.store(new Ctor({ id, password, name })).catch(() => {}),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]);
}

/**
 * True while an email/password submission is under way and ends in a full page
 * load. The auth layout reads it to keep the form mounted and skip its own
 * client-side redirect once Firebase reports the user signed in.
 */
let hardRedirectPending = false;
export const isHardRedirectPending = () => hardRedirectPending;

/**
 * Real page load instead of a client-side route change: extension password
 * managers (Dashlane, 1Password, Bitwarden…) offer to save the credentials they
 * captured on submit when the page actually navigates away.
 */
function hardRedirectToDashboard() {
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- full page load is the point
  window.location.assign("/dashboard/");
}

async function withHardRedirect(run: () => Promise<void>) {
  hardRedirectPending = true;
  try {
    await run();
  } catch (e) {
    hardRedirectPending = false;
    throw e;
  }
  hardRedirectToDashboard();
}

export function signUp({ displayName, email, password }: SignupValues) {
  return withHardRedirect(async () => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName });
    await ensureProfile(user.uid, { displayName, email });
    await storeCredential(email, password, displayName);
  });
}

export function signIn({ email, password }: LoginValues) {
  return withHardRedirect(async () => {
    await signInWithEmailAndPassword(auth, email, password);
    await storeCredential(email, password);
  });
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
