"use client";

import type { Exercise } from "@lpe/curriculum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useUser } from "@/lib/auth-context";
import {
  ANSWER_MAX_LENGTH,
  submissionSchema,
  useSaveSubmission,
  useSubmission,
  type SubmissionValues,
} from "@/lib/learning";
import { Alert, Button, Spinner } from "./ui";

export function ExerciseForm({ exercise, lessonId }: { exercise: Exercise; lessonId: string }) {
  const user = useUser();
  const submission = useSubmission(user.uid, exercise.id);
  const save = useSaveSubmission(user.uid, exercise.id, lessonId);

  const { register, handleSubmit, reset, control, formState } = useForm<SubmissionValues>({
    resolver: zodResolver(submissionSchema),
    defaultValues: { answer: "", checked: [] },
  });

  // Hydrate le formulaire une fois la réponse enregistrée chargée.
  useEffect(() => {
    if (submission.data) reset(submission.data);
  }, [submission.data, reset]);

  const onSubmit = handleSubmit((values) =>
    save.mutateAsync(values).then(() => reset(values)),
  );

  const answerLength = useWatch({ control, name: "answer" })?.length ?? 0;
  const checked = useWatch({ control, name: "checked" }) ?? [];

  return (
    <section aria-labelledby="exercise-title" className="rounded-2xl border border-border bg-surface p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-accent">Exercice</p>
      <h2 id="exercise-title" className="mt-1 text-lg font-semibold">
        {exercise.title}
      </h2>
      <p className="mt-2 text-sm">{exercise.brief}</p>
      <p className="mt-2 text-sm text-muted">
        <span className="font-medium text-foreground">Livrable :</span> {exercise.deliverable}
      </p>

      {submission.isPending ? (
        <Spinner label="Chargement de ta réponse" />
      ) : (
        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
          <fieldset>
            <legend className="text-sm font-medium">
              Checklist ({checked.length}/{exercise.checklist.length})
            </legend>
            <div className="mt-2 flex flex-col gap-2">
              {exercise.checklist.map((item, i) => (
                <label key={item} className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    value={i}
                    className="mt-0.5 size-4 accent-[var(--accent)]"
                    {...register("checked", { setValueAs: (v: string[]) => (v ?? []).map(Number) })}
                  />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="answer" className="text-sm font-medium">
              Ta réponse
            </label>
            <textarea
              id="answer"
              rows={10}
              maxLength={ANSWER_MAX_LENGTH}
              placeholder="Écris ton livrable ici. Il est enregistré dans ton compte."
              className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent"
              {...register("answer")}
            />
            <p className="self-end text-xs text-muted">
              {answerLength}/{ANSWER_MAX_LENGTH}
            </p>
            {formState.errors.answer && <Alert>{formState.errors.answer.message}</Alert>}
          </div>
          {submission.isError && <Alert>Impossible de charger ta réponse précédente.</Alert>}
          {save.isError && <Alert>L&apos;enregistrement a échoué. Vérifie ta connexion et réessaie.</Alert>}
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={formState.isSubmitting || !formState.isDirty}>
              {formState.isSubmitting ? "Enregistrement…" : "Enregistrer"}
            </Button>
            {save.isSuccess && !formState.isDirty && <span className="text-sm text-success">Enregistré ✓</span>}
          </div>
        </form>
      )}
    </section>
  );
}
