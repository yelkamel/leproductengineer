"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { z } from "zod";
import { db } from "./firebase";

/*
 * Modèle Firestore (voir firestore.rules à la racine du repo) :
 *   users/{uid}                          profil
 *   users/{uid}/progress/{lessonId}      une leçon terminée
 *   users/{uid}/submissions/{exerciseId} la réponse à un exercice
 */

export const ANSWER_MAX_LENGTH = 10_000;

export const submissionSchema = z.object({
  answer: z.string().max(ANSWER_MAX_LENGTH, `${ANSWER_MAX_LENGTH} caractères maximum.`),
  checked: z.array(z.number().int().nonnegative()).max(50),
});
export type SubmissionValues = z.infer<typeof submissionSchema>;

const keys = {
  progress: (uid: string) => ["progress", uid] as const,
  submission: (uid: string, exerciseId: string) => ["submission", uid, exerciseId] as const,
};

/** Crée le profil au premier passage, met à jour nom et e-mail ensuite. */
export async function ensureProfile(uid: string, data: { displayName: string; email: string }) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
  } else {
    await setDoc(ref, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  }
}

export function useProgress(uid: string) {
  return useQuery({
    queryKey: keys.progress(uid),
    queryFn: async () => {
      const snap = await getDocs(collection(db, "users", uid, "progress"));
      return new Set(snap.docs.map((d) => d.id));
    },
  });
}

export function useToggleLessonComplete(uid: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ lessonId, completed }: { lessonId: string; completed: boolean }) => {
      const ref = doc(db, "users", uid, "progress", lessonId);
      if (completed) await setDoc(ref, { completedAt: serverTimestamp() });
      else await deleteDoc(ref);
    },
    // Optimiste : la case se coche tout de suite, on revient en arrière si Firestore refuse.
    onMutate: async ({ lessonId, completed }) => {
      await qc.cancelQueries({ queryKey: keys.progress(uid) });
      const previous = qc.getQueryData<Set<string>>(keys.progress(uid));
      const next = new Set(previous);
      if (completed) next.add(lessonId);
      else next.delete(lessonId);
      qc.setQueryData(keys.progress(uid), next);
      return { previous };
    },
    onError: (_err, _vars, ctx) => qc.setQueryData(keys.progress(uid), ctx?.previous),
    onSettled: () => qc.invalidateQueries({ queryKey: keys.progress(uid) }),
  });
}

export function useSubmission(uid: string, exerciseId: string) {
  return useQuery({
    queryKey: keys.submission(uid, exerciseId),
    queryFn: async (): Promise<SubmissionValues | null> => {
      const snap = await getDoc(doc(db, "users", uid, "submissions", exerciseId));
      if (!snap.exists()) return null;
      const parsed = submissionSchema.safeParse(snap.data());
      return parsed.success ? parsed.data : null;
    },
  });
}

export function useSaveSubmission(uid: string, exerciseId: string, lessonId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: SubmissionValues) => {
      const data = submissionSchema.parse(values);
      await setDoc(doc(db, "users", uid, "submissions", exerciseId), {
        ...data,
        lessonId,
        updatedAt: serverTimestamp(),
      });
      return data;
    },
    onSuccess: (data) => qc.setQueryData(keys.submission(uid, exerciseId), data),
  });
}
