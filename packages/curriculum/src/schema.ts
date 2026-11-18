import { z } from "zod";

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case");

/**
 * Notes de préparation d'une vidéo. Elles servent à Youcef pour tourner,
 * et elles s'affichent dans le placeholder tant que la vidéo n'existe pas.
 */
export const videoPrepSchema = z.object({
  /** Les 10 premières secondes : la phrase qui donne envie de rester. */
  hook: z.string().min(1),
  /** Les points à couvrir, dans l'ordre. */
  keyPoints: z.array(z.string().min(1)).min(2),
  /** L'histoire vécue à raconter. Une piste, pas un fait : Youcef choisit. */
  story: z.string().min(1),
  /** La phrase que le dev doit retenir en sortant. */
  takeaway: z.string().min(1),
});

export const videoSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("placeholder"),
    targetMinutes: z.number().int().positive(),
    prep: videoPrepSchema,
  }),
  z.object({
    status: z.literal("ready"),
    /** URL d'intégration (YouTube non répertorié, Bunny, Mux…). */
    embedUrl: z.url(),
    minutes: z.number().int().positive(),
    prep: videoPrepSchema,
  }),
]);

/** Une skill d'agent IA (format SKILL.md) livrée avec la vidéo. */
export const skillSchema = z.object({
  name: slug,
  description: z.string().min(1),
  /** Corps markdown de la skill, sans le frontmatter. */
  body: z.string().min(1),
});

export const exerciseSchema = z.object({
  id: slug,
  title: z.string().min(1),
  brief: z.string().min(1),
  deliverable: z.string().min(1),
  /** Ce que l'apprenant a obtenu, affiché quand le kata est validé (« Ton problème est formulé. »). */
  achievement: z.string().min(1),
  checklist: z.array(z.string().min(1)).min(1),
});

export const lessonSchema = z.object({
  id: slug,
  slug,
  title: z.string().min(1),
  summary: z.string().min(1),
  video: videoSchema,
  skill: skillSchema,
  exercise: exerciseSchema,
});

export const moduleSchema = z.object({
  id: slug,
  slug,
  /** 0 = introduction. */
  order: z.number().int().nonnegative(),
  kicker: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  /** Ce que le dev sait faire à la fin du module. */
  outcome: z.string().min(1),
  lessons: z.array(lessonSchema).min(1),
});

export const curriculumSchema = z.array(moduleSchema).min(1);

export type VideoPrep = z.infer<typeof videoPrepSchema>;
export type Video = z.infer<typeof videoSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Exercise = z.infer<typeof exerciseSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type Module = z.infer<typeof moduleSchema>;
