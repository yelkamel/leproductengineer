---
title: Le Product Engineer
created: 2026-11-14
updated: 2026-11-14
status: v1-livree
inputDocuments:
  - ../../../../AGENTS.md
  - ../../../../docs/PROGRAMME.md
  - ~/Tech/youcefelkamel/context/brand/log-2026-11-13-linkedin-product-engineer.md
---

# PRD : Le Product Engineer

## 0. Objet du document

Ce PRD décrit la formation « Le Product Engineer » : une landing qui la présente et une
plateforme où un développeur s'inscrit gratuitement et suit une introduction, trois modules
(produit, design, tech), des exercices et des skills. Il est écrit **après coup** pour la V1,
déjà en production le 2026-11-14 : les epics 1 à 4 de `../../epics.md` sont `done`, les
suivants forment le backlog. Le suivi vit dans
`../../../implementation-artifacts/sprint-status.yaml`. Vocabulaire : voir §3, à utiliser tel
quel partout.

## 1. Vision

Les développeurs savent coder, et l'IA rend le code de moins en moins cher. Ce qui reste rare,
c'est le développeur qui sait **pourquoi** une feature mérite d'exister, **à quoi** elle doit
ressembler et **comment** la livrer : le Product Engineer, qui porte le produit, le design et la
tech. Les startups et scale-ups le recrutent, mais peu de développeurs savent y aller.

« Le Product Engineer » est une formation courte et pratique : chaque leçon combine une vidéo
de Youcef, un exercice appliqué au projet de l'apprenant (son projet fil rouge) et une skill
pour son agent IA. À la fin, l'apprenant a un dossier de décisions qu'il peut montrer en
entretien.

### 1.1 Pourquoi pour Youcef (objectif business)

La formation est d'abord un **actif de notoriété**. Youcef se repositionne en Product Engineer
(journal du 2026-11-13) ; LinkedIn sert la recherche d'emploi, et les trois modules **sont** les
trois piliers de contenu. Chaque post parle d'une décision réelle et renvoie vers la formation.
Trois issues, toutes valables :

1. **Notoriété** : la formation prouve publiquement l'expertise Product Engineer.
2. **Emploi ou mission** : des recruteurs, CTO ou clients contactent Youcef grâce à elle.
3. **Vente** : plus tard, une version payante ou un complément payant.

Même sans aucune vente, 1 et 2 suffisent à justifier la V1.

## 2. Utilisateurs

### 2.1 Jobs To Be Done

- **Apprenant (développeur)** : « Je livre des features, mais je veux peser sur les décisions et
  viser un poste de Product Engineer. Montre-moi la méthode, sur mon propre projet, sans me
  faire perdre des semaines. »
- **Apprenant, côté social** : « Je veux pouvoir montrer en entretien des décisions produit,
  design et tech que j'ai vraiment prises. »
- **Youcef (auteur)** : « Je veux publier mes vidéos au fil de l'eau sans toucher au code de
  l'app, et voir si la formation attire du monde. »
- **Recruteur / CTO / client (visiteur indirect)** : « En deux minutes sur la landing, je
  comprends que Youcef sait de quoi il parle. »

### 2.2 Non-utilisateurs (V1)

- Les débutants qui veulent apprendre à coder.
- Les développeurs qui veulent devenir PM et arrêter le code.
- Les entreprises qui veulent former une équipe (pas d'offre B2B en V1).

### 2.3 Parcours clés

- **UJ-1. Léa s'inscrit depuis un post LinkedIn.** Léa, dev front en scale-up, lit un post de
  Youcef sur une décision produit. Elle clique le lien, arrive sur la landing, lit le programme
  et clique « Commencer gratuitement ». Elle crée son compte (e-mail ou Google) et arrive sur
  son tableau de bord : 0/11, bouton « Commencer ». **Cas limite** : son e-mail a déjà un compte,
  un message lui dit de se connecter.
- **UJ-2. Léa suit une leçon.** Depuis le tableau de bord, elle ouvre la leçon. Elle regarde la
  vidéo (ou, tant qu'elle n'est pas tournée, le placeholder et ses notes), remplit l'exercice
  sur son fil rouge, coche la checklist et enregistre. Elle copie la skill dans
  `.claude/skills/`. Elle marque la leçon terminée et passe à la suivante. **Cas limite** :
  réseau coupé, l'enregistrement échoue avec un message clair et sa réponse reste dans le champ.
- **UJ-3. Léa revient trois jours plus tard.** Elle se connecte : le tableau de bord affiche sa
  progression et « Reprendre : <leçon> ». Sa réponse précédente est rechargée dans l'exercice.
- **UJ-4. Youcef publie une vidéo.** Il tourne la vidéo à partir des notes de préparation,
  l'héberge, met à jour une entrée du programme (`status: "ready"`, `embedUrl`, `minutes`) et
  déploie. La vidéo remplace le placeholder pour tous les apprenants.
- **UJ-5. Un CTO jauge Youcef.** Il arrive sur la landing depuis le profil LinkedIn, lit le
  programme et « Qui est derrière », et comprend le positionnement Product Engineer.

## 3. Glossaire

- **Formation** — L'ensemble du contenu « Le Product Engineer ».
- **Programme** — La liste ordonnée des modules et leçons, définie dans `packages/curriculum`.
- **Module** — Un bloc thématique : Introduction (ordre 0), Produit, Design, Tech (1 à 3).
  Contient 1..n leçons.
- **Leçon** — Unité d'apprentissage. Exactement une vidéo, un exercice, une skill.
- **Vidéo** — État `placeholder` (pas encore tournée) ou `ready` (URL d'intégration).
- **Notes de préparation** — Hook, points clés, histoire à raconter, phrase à retenir d'une
  vidéo. Servent au tournage et s'affichent sous le placeholder.
- **Exercice** — Consigne, livrable attendu et checklist, appliqués au projet fil rouge.
- **Réponse** — Ce que l'apprenant enregistre pour un exercice (texte + cases cochées).
- **Skill** — Fichier `SKILL.md` (frontmatter `name`, `description` + instructions) à installer
  dans un agent IA de code.
- **Projet fil rouge** — La feature ou l'app réelle sur laquelle l'apprenant applique toute la
  formation.
- **Progression** — L'ensemble des leçons marquées terminées par un apprenant.
- **Apprenant** — Utilisateur inscrit sur la plateforme.
- **Landing** — Le site public qui présente et vend la formation (`leproductengineer.web.app`).
- **Plateforme** — L'app où l'apprenant suit la formation (`leproductengineer-go.web.app`).

## 4. Fonctionnalités

### 4.1 Programme

**Description :** le programme est du code typé et validé, partagé par la landing et la
plateforme. Une erreur de contenu casse le build, jamais la production. V1 : introduction
(2 leçons) + 3 modules de 3 leçons = 11 leçons, ~87 minutes de vidéo prévues. Réalise UJ-4.

#### FR-1 : Programme validé au build
Le programme est validé par un schéma (Zod) au chargement. Réalise UJ-4.
- Un slug invalide, une leçon sans exercice ou sans skill font échouer le build.
- Les identifiants de leçon, d'exercice et de skill sont uniques (test automatisé).

#### FR-2 : Contenu V1 complet
Chaque leçon a une vidéo avec notes de préparation, un exercice et une skill.
- 11 leçons, 11 exercices, 11 skills `pe-*`.
- Les histoires à raconter sont des pistes, jamais des faits affirmés.

#### FR-3 : Publication d'une vidéo sans code applicatif
Youcef publie une vidéo en modifiant une seule entrée du programme. Réalise UJ-4.
- Passer `status` à `ready` avec `embedUrl` et `minutes` affiche le lecteur à la place du
  placeholder.

### 4.2 Compte apprenant

**Description :** inscription gratuite, accès immédiat à tout le programme. Réalise UJ-1, UJ-3.

#### FR-4 : Inscription et connexion par e-mail
L'apprenant crée un compte (prénom, e-mail, mot de passe de 8 caractères minimum) et se connecte.
- Validation côté client avec messages en français ; erreurs Firebase traduites.
- Un e-mail déjà utilisé affiche « Un compte existe déjà… Connecte-toi. »

#### FR-5 : Connexion Google
L'apprenant peut s'inscrire et se connecter avec Google.

#### FR-6 : Mot de passe oublié
L'apprenant reçoit un lien de réinitialisation. Le message de succès ne révèle pas si le
compte existe.

#### FR-7 : Zones protégées
Les pages d'apprentissage exigent un compte ; un visiteur non connecté est renvoyé vers la
connexion, un apprenant connecté ne revoit pas les pages d'auth.

### 4.3 Apprentissage

#### FR-8 : Tableau de bord
L'apprenant voit sa progression globale et par module, la liste des leçons avec leur état et
un bouton « Commencer » / « Reprendre » vers la première leçon non terminée. Réalise UJ-1, UJ-3.

#### FR-9 : Page leçon
L'apprenant voit la vidéo ou le placeholder avec les notes, l'exercice, la skill, et navigue
vers la leçon précédente et suivante. Réalise UJ-2.

#### FR-10 : Réponse à un exercice
L'apprenant enregistre sa réponse (10 000 caractères max) et sa checklist ; elles sont
rechargées à la visite suivante. Réalise UJ-2, UJ-3.

#### FR-11 : Skill téléchargeable
L'apprenant copie ou télécharge le `SKILL.md` de la leçon.

#### FR-12 : Progression
L'apprenant marque une leçon terminée ou annule. Mise à jour optimiste, retour arrière si
l'écriture échoue.

### 4.4 Landing

#### FR-13 : Landing de présentation
La landing présente le rôle, le programme (lu depuis le même package), le format d'une leçon,
pour qui / pas pour qui, l'auteur, une FAQ et deux appels « Commencer gratuitement » vers
l'inscription. Réalise UJ-1, UJ-5.
- Métadonnées SEO et Open Graph, `robots.txt`, `sitemap.xml`.
- La plateforme est en `noindex`.

### 4.5 Sécurité et données (NFR transverses)

- **Pas de backend** : export statique Next.js + SDK Firebase client ; la barrière réelle, ce
  sont les règles Firestore.
- **Isolation** : un apprenant ne lit et n'écrit que `users/{uid}/**` ; tout le reste est fermé.
- **Intégrité** : champs autorisés listés, tailles bornées, horodatages imposés par le serveur.
- **Accessibilité de base** : labels, `aria-invalid`, focus visible, barres de progression
  annoncées.

## 5. Non-objectifs

- Pas une école ni un certificat : le résultat est un dossier de décisions réelles.
- Pas de communauté, de forum ni de coaching en V1.
- Pas d'apprentissage du code.
- La formation ne doit pas manger la recherche d'emploi (journal 2026-11-13, tension 4).

## 6. Périmètre

### 6.1 Dans la V1 (livré le 2026-11-14)

Programme complet, comptes e-mail et Google, tableau de bord, leçons, réponses, skills,
progression, landing, règles Firestore, déploiement des deux sites.

### 6.2 Hors V1

- **Vidéos tournées** : epic 5 (le contenu existe en notes, pas encore en vidéo).
- **Mesure et distribution LinkedIn** : epic 6.
- **Design final** : epic 7 (design provisoire assumé).
- **Monétisation** : epic 8. `[NOTE FOR PM]` Aucun prix n'est fixé ; la règle « aucun prix
  dans un post » de youcefelkamel impose une décision explicite de Youcef avant d'en afficher.
- Bonus marketing, mini web app de choix de stack (après les trois modules, journal 2026-11-13).

## 7. Indicateurs de succès

**Principal**
- **SM-1 : Inscriptions**, comptes créés par mois. Cible initiale : à fixer après le premier
  mois de mesure `[ASSUMPTION]`. Valide FR-4, FR-5, FR-13.

**Secondaires**
- **SM-2 : Activation**, part des inscrits qui terminent au moins une leçon. Valide FR-8 à FR-12.
- **SM-3 : Achèvement**, part des inscrits qui terminent le projet final (leçon 3.3).
- **SM-4 : Opportunités entrantes**, messages de recruteurs, CTO ou clients qui citent la
  formation ou les posts. C'est l'indicateur qui compte le plus pour Youcef.
- **SM-5 : Clics LinkedIn → landing**, mesurés par UTM. Valide FR-13.

**Contre-indicateurs (à ne pas optimiser)**
- **SM-C1 : Temps passé par Youcef sur la formation** : si elle dépasse le temps de
  candidature, elle recule. Contrebalance SM-1.
- **SM-C2 : Inscriptions par promesse gonflée** : aucun chiffre ni résultat non prouvé dans la
  landing ou les posts. Contrebalance SM-1 et SM-5.

## 8. Questions ouvertes

1. Où héberger les vidéos (YouTube non répertorié, Bunny Stream, Mux) ? Impacte coût et
   confidentialité.
2. Les notes de préparation restent-elles visibles des apprenants tant que la vidéo n'existe
   pas, ou seulement pour Youcef ?
3. Quel outil d'analytics (aucun en V1) : Firebase Analytics, Plausible, PostHog ?
4. Faut-il capter l'e-mail des inscrits dans Lumail pour annoncer les nouvelles vidéos ?
5. Quelle forme payante, si un jour : version avancée, revue de dossier, coaching ?
6. Domaine personnalisé (ex. `leproductengineer.fr`) ou `web.app` ?

## 9. Index des hypothèses

- §7 SM-1 — cible d'inscriptions à fixer après un mois de mesure.
- §1.1 — la notoriété et les opportunités entrantes justifient la V1 même sans vente.
- §2.1 — les apprenants ont accès à un agent IA de code pour utiliser les skills.
