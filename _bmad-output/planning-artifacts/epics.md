---
status: final
updated: 2026-11-14
inputDocuments:
  - prds/prd-leproductengineer-2026-11-14/prd.md
---

# leproductengineer - Découpage en epics

## Overview

Découpage de la formation « Le Product Engineer ». Les epics 1 à 4 décrivent la V1 **déjà
livrée** le 2026-11-14 (stories `done`, écrites après coup depuis le code). Les epics 5 à 8
forment le backlog. Ordre d'exécution conseillé : 5 et 6 en parallèle (tourner + publier),
puis 7, puis 8 seulement si l'intérêt est mesuré.

Definition of Done : `npm run typecheck && npm run lint && npm test && npm run build` verts,
règles Firestore à jour si le modèle change, déployé.

## Requirements Inventory

### Functional Requirements

FR-1 à FR-13 : voir `prds/prd-leproductengineer-2026-11-14/prd.md` §4.

### NonFunctional Requirements

Pas de backend ; isolation `users/{uid}/**` ; champs bornés et horodatages serveur ;
accessibilité de base ; plateforme en `noindex`.

### FR Coverage Map

| FR | Story |
|---|---|
| FR-1, FR-2, FR-3 | 2.1, 2.2, 2.3 |
| FR-4, FR-6, FR-7 | 3.1, 3.3, 3.4 |
| FR-5 | 3.2 |
| FR-8 | 3.5 |
| FR-9, FR-11 | 3.6, 3.8 |
| FR-10 | 3.7 |
| FR-12 | 3.9 |
| NFR sécurité | 3.10 |
| FR-13 | 4.1, 4.2 |

## Liste des epics

1. Fondations (done)
2. Programme V1 (done)
3. Plateforme apprenant (done, sauf 3.2 en review)
4. Landing (done)
5. Vidéos (backlog)
6. Mesure et distribution LinkedIn (backlog)
7. Design final (backlog)
8. Monétisation (backlog)

## Epic 1: Fondations

Un repo, deux sites, un projet Firebase : la base sur laquelle tout le reste se déploie.

### Story 1.1: Monorepo Next.js et TypeScript

As a développeur du projet,
I want un monorepo npm workspaces avec deux apps Next.js 16 et un package partagé,
So that la landing et la plateforme partagent le même programme sans duplication.

**Acceptance Criteria:**

**Given** le repo cloné
**When** je lance `npm install && npm run build`
**Then** `apps/landing/out` et `apps/platform/out` sont générés en export statique
**And** `npm run typecheck`, `npm run lint` et `npm test` passent depuis la racine

### Story 1.2: Projet Firebase et deux sites Hosting

As a Youcef,
I want un projet Firebase avec un site Hosting par app,
So that la landing et la plateforme ont chacune leur URL.

**Acceptance Criteria:**

**Given** le projet `leproductengineer-93`
**When** je lance `npm run deploy`
**Then** la landing est servie sur `leproductengineer.web.app` et la plateforme sur `leproductengineer-go.web.app`
**And** les cibles `landing` et `platform` sont déclarées dans `.firebaserc`

### Story 1.3: Documentation agent et projet

As a agent IA ou développeur qui reprend le projet,
I want un `AGENTS.md` qui décrit stack, commandes et règles,
So that je peux contribuer sans redécouvrir l'architecture.

**Acceptance Criteria:**

**Given** le repo
**When** j'ouvre `AGENTS.md`
**Then** j'y trouve les URLs, la stack, les commandes, le modèle Firestore et la procédure de publication d'une vidéo

## Epic 2: Programme V1

Le contenu de la formation, typé, validé et partagé : introduction + 3 modules, 11 leçons.

### Story 2.1: Schéma du programme

As a Youcef,
I want un schéma Zod pour modules, leçons, vidéos, exercices et skills,
So that une erreur de contenu casse le build plutôt que la production.

**Acceptance Criteria:**

**Given** une leçon sans skill ou un slug invalide dans `content.ts`
**When** je lance le build
**Then** il échoue avec l'erreur de validation
**And** une vidéo est soit `placeholder` (durée cible + notes) soit `ready` (`embedUrl` + `minutes`)

### Story 2.2: Contenu des 11 leçons

As a apprenant,
I want une introduction et trois modules (produit, design, tech) avec vidéo, exercice et skill par leçon,
So that je peux appliquer la méthode Product Engineer à mon projet fil rouge.

**Acceptance Criteria:**

**Given** le programme
**When** je le parcours
**Then** il contient 11 leçons, chacune avec notes de préparation, un exercice (consigne, livrable, checklist) et une skill `pe-*`
**And** les histoires à raconter sont formulées comme des pistes, pas comme des faits

### Story 2.3: Navigation et calculs de progression

As a plateforme,
I want des helpers (leçon par slug, précédente/suivante, prochaine non terminée, progression par module, rendu SKILL.md),
So that les écrans n'ont aucune logique de parcours en dur.

**Acceptance Criteria:**

**Given** les tests de `packages/curriculum`
**When** je lance `npm test`
**Then** l'unicité des ids, la navigation entre modules, la reprise et le rendu SKILL.md sont vérifiés

## Epic 3: Plateforme apprenant

L'app où l'apprenant s'inscrit et suit la formation.

### Story 3.1: Inscription et connexion par e-mail

As a développeur visiteur,
I want créer un compte avec prénom, e-mail et mot de passe puis me connecter,
So that j'accède gratuitement à la formation.

**Acceptance Criteria:**

**Given** le formulaire d'inscription
**When** je saisis un mot de passe de moins de 8 caractères ou deux mots de passe différents
**Then** un message en français s'affiche sous le champ concerné
**And** un e-mail déjà utilisé affiche « Un compte existe déjà… Connecte-toi. »
**And** un profil `users/{uid}` est créé à l'inscription

### Story 3.2: Connexion Google

As a développeur visiteur,
I want m'inscrire ou me connecter avec Google,
So that je n'ai pas de mot de passe à créer.

**Acceptance Criteria:**

**Given** le fournisseur Google activé et `leproductengineer-go.web.app` en domaine autorisé
**When** je clique « Continuer avec Google » et valide la popup
**Then** j'arrive sur le tableau de bord et mon profil est créé ou mis à jour
**And** fermer la popup affiche « Connexion annulée. »

> Statut `review` : code livré et fournisseur activé, mais le parcours n'a pas encore été
> vérifié dans un navigateur réel.

### Story 3.3: Mot de passe oublié

As a apprenant,
I want recevoir un lien de réinitialisation,
So that je récupère mon compte.

**Acceptance Criteria:**

**Given** la page « Mot de passe oublié »
**When** je soumets un e-mail, connu ou non
**Then** le même message de succès s'affiche, sans révéler si le compte existe

### Story 3.4: Zones protégées

As a apprenant,
I want que les pages d'apprentissage exigent un compte,
So that ma progression reste à moi.

**Acceptance Criteria:**

**Given** que je ne suis pas connecté
**When** j'ouvre `/dashboard/` ou une leçon
**Then** je suis renvoyé vers `/login/`
**And** connecté, les pages d'auth me renvoient vers le tableau de bord

### Story 3.5: Tableau de bord

As a apprenant,
I want voir ma progression et reprendre où je me suis arrêté,
So that je sais toujours quelle est la prochaine étape.

**Acceptance Criteria:**

**Given** que j'ai terminé 1 leçon sur 11
**When** j'ouvre le tableau de bord
**Then** je vois « 1 leçon terminée sur 11 », une barre par module et « Reprendre : <leçon 2> »
**And** quand tout est terminé, un message de félicitations remplace le bouton

### Story 3.6: Page leçon avec vidéo ou placeholder

As a apprenant,
I want une page par leçon avec la vidéo, ou un placeholder avec les notes tant qu'elle n'est pas tournée,
So that je peux avancer même avant la sortie des vidéos.

**Acceptance Criteria:**

**Given** une vidéo `placeholder`
**When** j'ouvre la leçon
**Then** je vois « Vidéo en préparation », la durée cible, le hook et les notes dépliables
**And** une vidéo `ready` affiche le lecteur intégré
**And** les 11 pages sont générées statiquement au build

### Story 3.7: Réponse aux exercices

As a apprenant,
I want enregistrer ma réponse et ma checklist pour chaque exercice,
So that je construis mon dossier fil rouge au fil des leçons.

**Acceptance Criteria:**

**Given** une réponse enregistrée
**When** je reviens sur la leçon
**Then** ma réponse et mes cases cochées sont rechargées
**And** au-delà de 10 000 caractères la saisie est bloquée
**And** un échec réseau affiche un message sans perdre le texte saisi

### Story 3.8: Skill à copier ou télécharger

As a apprenant,
I want copier ou télécharger le SKILL.md de la leçon,
So that mon agent IA applique la méthode avec moi.

**Acceptance Criteria:**

**Given** la page leçon
**When** je clique « Copier » ou « Télécharger SKILL.md »
**Then** j'obtiens le fichier avec son frontmatter `name` et `description`

### Story 3.9: Progression par leçon

As a apprenant,
I want marquer une leçon terminée ou annuler,
So that mon tableau de bord reflète où j'en suis.

**Acceptance Criteria:**

**Given** une leçon non terminée
**When** je clique « Marquer comme terminée »
**Then** l'état change immédiatement (optimiste)
**And** si l'écriture échoue, l'état revient en arrière avec un message

### Story 3.10: Règles de sécurité Firestore

As a Youcef,
I want que chaque apprenant ne lise et n'écrive que ses propres données,
So that aucune fuite ni falsification n'est possible sans backend.

**Acceptance Criteria:**

**Given** les règles déployées
**When** un apprenant tente de lire ou d'écrire chez un autre, d'ajouter un champ non prévu ou d'imposer son propre horodatage
**Then** Firestore refuse (403)
**And** ses propres écritures de profil, progression et réponse passent (vérifié le 2026-11-14 : 9/9 cas)

## Epic 4: Landing

Le site public qui présente la formation et convertit les visiteurs venus de LinkedIn.

### Story 4.1: Landing de présentation

As a développeur venu d'un post LinkedIn,
I want comprendre en deux minutes ce qu'est un Product Engineer et ce que contient la formation,
So that je décide de m'inscrire.

**Acceptance Criteria:**

**Given** `leproductengineer.web.app`
**When** je la parcours
**Then** je vois la promesse, les trois casquettes, le programme (lu depuis le package partagé), le format d'une leçon, pour qui / pas pour qui, l'auteur et une FAQ
**And** deux boutons mènent à l'inscription sur la plateforme

### Story 4.2: SEO de base

As a Youcef,
I want des métadonnées propres sur la landing et une plateforme non indexée,
So that la landing se partage bien et seule elle apparaît dans Google.

**Acceptance Criteria:**

**Given** la landing
**When** un robot la visite
**Then** il trouve title, description, Open Graph, `robots.txt` et `sitemap.xml`
**And** la plateforme renvoie `X-Robots-Tag: noindex`

## Epic 5: Vidéos

Transformer les notes de préparation en vraies vidéos, publiées au fil de l'eau.

### Story 5.1: Choisir l'hébergement vidéo

As a Youcef,
I want choisir où héberger les vidéos (YouTube non répertorié, Bunny Stream, Mux),
So that je publie sans coût ni friction inutile.

**Acceptance Criteria:**

**Given** les trois options comparées (coût, confidentialité, lecteur intégrable)
**When** je décide
**Then** la décision est écrite dans `docs/decisions.md` et l'`embedUrl` attendu est documenté

### Story 5.2: Tourner et publier les vidéos de l'introduction

As a apprenant,
I want les vidéos 0.1 et 0.2,
So that je comprends le rôle et la méthode avant de commencer.

**Acceptance Criteria:**

**Given** les notes de préparation des leçons 0.1 et 0.2
**When** les vidéos sont publiées
**Then** leur `status` passe à `ready` et la plateforme les affiche

### Story 5.3: Tourner et publier les vidéos du module Produit

As a apprenant,
I want les vidéos 1.1 à 1.3,
So that je suis le module Produit en entier.

**Acceptance Criteria:**

**Given** les notes des leçons 1.1 à 1.3
**When** les vidéos sont publiées
**Then** les trois leçons sont `ready`

### Story 5.4: Tourner et publier les vidéos du module Design

As a apprenant,
I want les vidéos 2.1 à 2.3,
So that je suis le module Design en entier.

**Acceptance Criteria:**

**Given** les notes des leçons 2.1 à 2.3
**When** les vidéos sont publiées
**Then** les trois leçons sont `ready`

### Story 5.5: Tourner et publier les vidéos du module Tech

As a apprenant,
I want les vidéos 3.1 à 3.3,
So that je termine la formation avec le projet final.

**Acceptance Criteria:**

**Given** les notes des leçons 3.1 à 3.3
**When** les vidéos sont publiées
**Then** les trois leçons sont `ready`

### Story 5.6: Visibilité des notes de préparation

As a Youcef,
I want décider si les apprenants voient les notes de préparation sous le placeholder,
So that je ne montre pas un brouillon que je n'assume pas.

**Acceptance Criteria:**

**Given** la décision prise
**When** une vidéo est `placeholder`
**Then** les notes sont affichées ou masquées selon la décision, sans toucher aux vidéos `ready`

## Epic 6: Mesure et distribution LinkedIn

Faire de la formation un actif de notoriété mesurable : chaque post y renvoie, chaque
inscription se compte.

### Story 6.1: Analytics landing et plateforme

As a Youcef,
I want mesurer visites, clics « Commencer », inscriptions, leçons terminées,
So that je sais si la formation attire (SM-1, SM-2, SM-3).

**Acceptance Criteria:**

**Given** un outil choisi (Firebase Analytics, Plausible ou PostHog) et documenté
**When** un visiteur passe de la landing à l'inscription puis termine une leçon
**Then** les événements `landing_viewed`, `signup_clicked`, `account_created`, `lesson_completed` sont enregistrés
**And** la bannière de consentement respecte le RGPD si l'outil dépose des cookies

### Story 6.2: Liens UTM par post

As a Youcef,
I want un lien UTM par post LinkedIn,
So that je sais quel post amène des inscrits (SM-5).

**Acceptance Criteria:**

**Given** un post publié
**When** un visiteur clique son lien
**Then** la source `linkedin` et l'identifiant du post sont attribués à la visite et, si possible, à l'inscription

### Story 6.3: Image Open Graph

As a Youcef,
I want une image de partage pour la landing,
So that les liens dans les posts et les DM s'affichent avec un visuel.

**Acceptance Criteria:**

**Given** un lien vers la landing collé dans LinkedIn
**When** l'aperçu se génère
**Then** il affiche l'image, le titre et la description

### Story 6.4: Plan éditorial des trois piliers

As a Youcef,
I want une série de posts LinkedIn adossée aux modules (produit, design, tech),
So that chaque post raconte une décision réelle et renvoie vers la formation.

**Acceptance Criteria:**

**Given** le programme
**When** le plan est écrit (dans le repo youcefelkamel, brief layou-grow)
**Then** chaque post cite une leçon, une décision vécue et prouvable, et un lien UTM
**And** aucun prix ni chiffre non prouvé n'apparaît

### Story 6.5: Capter l'e-mail pour annoncer les vidéos

As a apprenant,
I want être prévenu quand une nouvelle vidéo sort,
So that je reviens suivre la formation.

**Acceptance Criteria:**

**Given** un consentement explicite à l'inscription
**When** un compte est créé
**Then** l'e-mail rejoint une liste Lumail dédiée
**And** l'apprenant peut se désinscrire

## Epic 7: Design final

Remplacer le design provisoire par une identité qui porte le positionnement Product Engineer.

### Story 7.1: Direction artistique et tokens

As a Youcef,
I want une direction artistique et des tokens (couleurs, typo, espacements),
So that la formation a sa propre identité, cohérente avec ma marque.

**Acceptance Criteria:**

**Given** la DA validée
**When** les tokens remplacent ceux de `globals.css` dans les deux apps
**Then** landing et plateforme partagent la même identité, en clair et en sombre

### Story 7.2: Refonte de la landing

As a visiteur,
I want une landing travaillée visuellement,
So that elle donne confiance autant que son contenu.

**Acceptance Criteria:**

**Given** la DA de 7.1
**When** la landing est refaite
**Then** le contenu reste lu depuis le package partagé et le score Lighthouse reste au-dessus de 90

### Story 7.3: Refonte de la plateforme

As a apprenant,
I want une plateforme agréable à suivre,
So that je vais au bout de la formation.

**Acceptance Criteria:**

**Given** la DA de 7.1
**When** tableau de bord et page leçon sont refaits
**Then** tous les états (chargement, vide, erreur, succès) sont conçus et accessibles

## Epic 8: Monétisation

Seulement si l'intérêt est mesuré (epic 6) et après une décision explicite de prix.

### Story 8.1: Décider l'offre payante

As a Youcef,
I want décider ce qui devient payant et à quel prix,
So that la vente ne contredit ni la gratuité promise ni la règle « aucun prix dans un post ».

**Acceptance Criteria:**

**Given** au moins un mois de mesures (SM-1 à SM-4)
**When** la décision est prise
**Then** elle est écrite (offre, prix, ce qui reste gratuit pour les inscrits actuels)

### Story 8.2: Paiement

As a apprenant,
I want payer l'offre en ligne,
So that j'accède au contenu payant immédiatement.

**Acceptance Criteria:**

**Given** l'offre de 8.1
**When** je paie
**Then** mon accès est débloqué (Stripe Checkout + un champ de droits côté Firestore protégé par les règles)
**And** l'apprenant ne peut pas s'accorder lui-même le droit
