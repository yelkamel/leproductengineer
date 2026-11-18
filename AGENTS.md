# Le Product Engineer — formation pour devenir Product Engineer

Monorepo npm workspaces. Deux sites statiques Next.js sur un seul projet Firebase.

| Quoi | Où | URL |
|---|---|---|
| Landing (vend la formation) | `apps/landing` | https://leproductengineer.web.app |
| Plateforme (inscription, cours, exercices) | `apps/platform` | https://leproductengineer-go.web.app |
| Programme (modules, leçons, exercices, skills, ceintures) | `packages/curriculum` | — |
| Thème « Dojo BD » partagé (tokens, composants BD) | `packages/ui` | — |
| Règles Firestore | `firestore.rules` | — |

Projet Firebase : `leproductengineer-93` (console : https://console.firebase.google.com/project/leproductengineer-93).

## Stack

Next.js 16 (App Router, `output: "export"`), React 19, TypeScript strict, Tailwind CSS 4,
Firebase (Auth e-mail/mot de passe + Google, Firestore), TanStack Query, React Hook Form + Zod,
Vitest + Testing Library. Pas de backend : tout passe par le SDK client et les règles Firestore.

## Commandes

```bash
npm install
npm run dev:landing          # http://localhost:3000
npm run dev:platform
npm test                     # vitest (curriculum + platform)
npm run typecheck && npm run lint
npm run deploy               # build les deux sites + hosting + règles Firestore
npm run deploy:landing       # ou un seul site
```

## Règles du repo

- **Le contenu vit dans le code**, pas en base : `packages/curriculum/src/content.ts`, validé
  par Zod au build (une erreur de contenu casse le build, pas la prod).
- **Publier une vidéo** : dans `content.ts`, passer `video.status` de `"placeholder"` à
  `"ready"`, ajouter `embedUrl` et `minutes`, puis `npm run deploy:platform`. Garder `prep`.
- **Les pistes d'histoire (`prep.story`) sont des suggestions.** N'affirmer à l'écran que ce
  qui est vécu et prouvable.
- **Firestore** : `users/{uid}`, `users/{uid}/progress/{lessonId}`,
  `users/{uid}/submissions/{exerciseId}`. Chaque apprenant ne touche que ses documents ;
  les horodatages sont imposés serveur (`request.time`). Toute nouvelle collection = une règle
  explicite, le reste est fermé.
- **Export statique** : pas de Server Actions, pas de route handlers dynamiques, pas de
  `cookies()`/`headers()`. Les pages protégées sont gardées côté client
  (`app/(app)/layout.tsx`) ; la vraie barrière, ce sont les règles Firestore.
- **Design** : thème « Dojo BD », clair uniquement, dans `packages/ui` (`theme.css` + composants
  React). Planche de DA : https://claude.ai/artifact/DCaHxuf9UwHtQ4ZEggSfBe. Ordre : tokens →
  composants → écrans ; aucune couleur ni police en dur dans un écran. Un procédé BD = un rôle
  (bulle = Youcef, « Oss ! » = réussite, ombre en aplat = la seule action à faire).
- **Ceintures** : calculées depuis le nombre de katas (leçons) validés, `packages/curriculum/src/belts.ts`.
  Un kata se valide quand toute la checklist de son exercice est cochée et enregistrée.
- Les illustrations de `public/illustrations/` sont **provisoires** (visuels LinkedIn recadrés).
- Langue : contenu et code commentés en français.

## Suivi du projet (BMAD)

BMAD 6.12.4 est installé (`_bmad/`, skills dans `.claude/skills/bmad-*`).

| Quoi | Où |
|---|---|
| PRD | `_bmad-output/planning-artifacts/prds/prd-leproductengineer-2026-11-14/prd.md` |
| Epics et stories | `_bmad-output/planning-artifacts/epics.md` |
| Statut de chaque story | `_bmad-output/implementation-artifacts/sprint-status.yaml` |

- Epics 1 à 4 = la V1 livrée le 2026-11-14 (`done`, sauf 3.2 Google en `review` : à vérifier
  dans un vrai navigateur). Epics 5 à 8 = backlog.
- Voir où on en est : skill `bmad-sprint-planning` (« show sprint status »).
- Lancer une story : skill `bmad-build`, qui met le statut à jour.
- Nouvelle story : l'ajouter dans `epics.md` (format `### Story N.M: Titre`), puis relancer
  `bmad-sprint-planning` pour régénérer le suivi (les statuts existants sont conservés).
