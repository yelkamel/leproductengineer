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
import { Case } from "@lpe/ui";
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
    <Case className="p-5 sm:p-6">
      <section aria-labelledby="exercise-title">
      <p className="bd-kicker">Exercice</p>
      <h2 id="exercise-title" className="bd-h3 mt-2 text-xl">
        {exercise.title}
      </h2>
      <p className="mt-3 max-w-[65ch]"><span className="font-semibold">Consigne.</span> {exercise.brief}</p>
      <p className="mt-2 max-w-[65ch]">
        <span className="font-semibold">Livrable.</span> {exercise.deliverable}
      </p>

      {submission.isPending ? (
        <Spinner label="Chargement de ta réponse" />
      ) : (
        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
          <fieldset>
            <legend className="bd-label">
              Checklist ({checked.length}/{exercise.checklist.length})
            </legend>
            <div className="mt-2 flex flex-col gap-2">
              {exercise.checklist.map((item, i) => (
                <label key={item} className="flex cursor-pointer items-start gap-2.5 text-[15px]">
                  <input
                    type="checkbox"
                    value={i}
                    className="bd-check"
                    {...register("checked", { setValueAs: (v: string[]) => (v ?? []).map(Number) })}
                  />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="answer" className="bd-label">
              Ta réponse
            </label>
            <textarea
              id="answer"
              rows={10}
              maxLength={ANSWER_MAX_LENGTH}
              placeholder="Écris ton livrable ici. Il est enregistré dans ton compte."
              className="bd-input"
              aria-invalid={formState.errors.answer ? true : undefined}
              {...register("answer")}
            />
            <p className="self-end font-mono text-[11px] text-ink-soft">
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
            {save.isSuccess && !formState.isDirty && <span role="status" className="font-letter text-sm font-bold">Enregistré.</span>}
          </div>
        </form>
      )}
      </section>
    </Case>
  );
}
