import type { Module } from "./schema";

/**
 * Le programme V1 : une introduction et trois modules (produit, design, tech).
 *
 * Toutes les vidéos sont des placeholders : `prep` contient les notes de
 * tournage. Quand une vidéo est tournée, passer `status` à "ready" et
 * renseigner `embedUrl` + `minutes`. Les pistes d'histoire (`story`) sont des
 * suggestions : seul ce qui est vécu et prouvable passe à l'écran.
 */
export const curriculum: Module[] = [
  {
    id: "introduction",
    slug: "introduction",
    order: 0,
    kicker: "Introduction",
    title: "Ce qu'est vraiment un Product Engineer",
    tagline: "Le dev qui ne fait pas qu'exécuter : il comprend, il choisit, il livre.",
    outcome:
      "Tu sais expliquer le rôle en une phrase, tu connais tes points forts et tu as choisi ton projet fil rouge.",
    lessons: [
      {
        id: "intro-role",
        slug: "le-role",
        title: "Du dev qui exécute au dev qui décide",
        summary:
          "Product + design + tech : les trois casquettes, ce qui différencie le Product Engineer d'un PM, d'un designer et d'un full-stack, et pourquoi les startups le recrutent.",
        video: {
          status: "placeholder",
          targetMinutes: 6,
          prep: {
            hook: "Tu peux coder n'importe quelle feature. Mais qui décide laquelle mérite d'exister ?",
            keyPoints: [
              "La définition en une phrase : un dev qui porte le résultat, pas seulement le ticket.",
              "Les trois casquettes : produit (le besoin, les risques, les priorités), design (les choix d'interface), tech (faisabilité, données, perf, stack).",
              "Ce que ce n'est pas : un PM qui code mal, ni un full-stack avec un titre plus joli.",
              "Pourquoi les startups et scale-ups le cherchent : moins d'allers-retours, des décisions plus rapides.",
            ],
            story:
              "Piste : le moment où tu as arrêté de te présenter comme CTO pour te présenter comme Product Engineer, et ce que ça a changé dans tes échanges.",
            takeaway: "Un Product Engineer est jugé sur l'impact de ce qu'il livre, pas sur le volume de code.",
          },
        },
        skill: {
          name: "pe-role-check",
          description:
            "Évalue une tâche ou un ticket sous les trois angles du Product Engineer (produit, design, tech) avant de commencer à coder.",
          body: `# Contrôle Product Engineer

Avant d'écrire la moindre ligne de code pour la tâche donnée, réponds à ces questions et affiche les réponses sous forme de tableau.

## Produit
- Quel problème utilisateur cette tâche résout-elle ? Qui l'a, et à quelle fréquence ?
- Comment saura-t-on que c'est réussi (un chiffre, un comportement observable) ?

## Design
- Quel est le parcours de l'utilisateur, de l'entrée à la sortie ?
- Quels états faut-il prévoir : vide, chargement, erreur, succès ?

## Tech
- Quelle est la solution la plus simple qui tient la route ?
- Quel est le risque technique principal (données, perf, sécurité) ?

Si une réponse manque, pose la question à l'utilisateur au lieu de supposer. Termine par une recommandation : « coder maintenant », « clarifier d'abord » ou « réduire le périmètre ».`,
        },
        exercise: {
          id: "auto-diagnostic",
          title: "Ton auto-diagnostic",
          brief:
            "Note-toi de 1 à 5 sur chacune des trois casquettes. Pour chaque note, donne une preuve : une décision que tu as réellement prise.",
          deliverable: "Trois notes, trois preuves, et la casquette que tu veux muscler en premier.",
          checklist: [
            "Une note de 1 à 5 pour produit, design et tech",
            "Une décision réelle par casquette (pas une compétence théorique)",
            "La casquette la plus faible identifiée",
          ],
        },
      },
      {
        id: "intro-methode",
        slug: "la-methode",
        title: "Comment suivre la formation",
        summary:
          "Un projet fil rouge, un livrable par leçon, une skill à installer dans ton agent IA. Tu n'apprends pas un cours : tu prends des décisions sur un vrai sujet.",
        video: {
          status: "placeholder",
          targetMinutes: 4,
          prep: {
            hook: "Tu ne deviens pas Product Engineer en regardant des vidéos. Tu le deviens en décidant.",
            keyPoints: [
              "Le fil rouge : une feature ou une petite app réelle (la tienne, celle de ton boulot, ou une idée).",
              "Chaque leçon = une vidéo courte + un exercice qui fait avancer le fil rouge + une skill.",
              "Les skills : des fichiers SKILL.md à donner à ton agent (Claude Code, Codex, Cursor…) pour qu'il raisonne comme un Product Engineer avec toi.",
              "À la fin : un dossier de décisions que tu peux montrer en entretien.",
            ],
            story:
              "Piste : montrer à l'écran une skill installée dans ton agent et le résultat qu'elle produit sur un vrai ticket.",
            takeaway: "Choisis ton fil rouge aujourd'hui, même imparfait.",
          },
        },
        skill: {
          name: "pe-fil-rouge",
          description:
            "Aide à choisir et cadrer un projet fil rouge réaliste pour la formation Product Engineer.",
          body: `# Cadrer le projet fil rouge

Aide l'utilisateur à choisir un projet fil rouge. Un bon fil rouge :
- touche de vrais utilisateurs (ou des utilisateurs accessibles pour en parler) ;
- tient en une feature ou une petite app livrable en quelques semaines ;
- implique au moins un choix produit, un choix d'interface et un choix technique.

Pose au plus trois questions pour comprendre le contexte, puis propose deux ou trois sujets. Pour chacun : pour qui, quel problème, pourquoi c'est un bon terrain d'entraînement. Termine par une fiche de trois lignes pour le sujet retenu : utilisateur, problème, résultat attendu.`,
        },
        exercise: {
          id: "fil-rouge",
          title: "Choisis ton fil rouge",
          brief:
            "Choisis la feature ou l'app sur laquelle tu vas appliquer chaque module. Décris-la en trois lignes.",
          deliverable: "Utilisateur visé, problème, résultat attendu (trois lignes).",
          checklist: [
            "Un utilisateur réel ou accessible",
            "Un problème formulé sans parler de solution",
            "Un résultat observable",
          ],
        },
      },
    ],
  },
  {
    id: "produit",
    slug: "produit",
    order: 1,
    kicker: "Module 1",
    title: "Produit : comprendre avant de construire",
    tagline: "Le vrai besoin, les bonnes priorités, les risques testés avant le code.",
    outcome:
      "Tu transformes une demande floue en problème clair, tu découpes en incréments livrables et tu sais quoi tester avant de coder.",
    lessons: [
      {
        id: "produit-probleme",
        slug: "le-vrai-probleme",
        title: "Trouver le vrai problème",
        summary:
          "Une demande de feature est une solution déguisée. On remonte au problème, à l'utilisateur qui l'a et au signal qui prouve qu'il existe.",
        video: {
          status: "placeholder",
          targetMinutes: 8,
          prep: {
            hook: "« Ajoute un bouton export PDF. » Neuf fois sur dix, personne n'a besoin d'un PDF.",
            keyPoints: [
              "La demande est une solution : demande « pour quoi faire ? » jusqu'au problème.",
              "Le job-to-be-done : ce que l'utilisateur essaie d'accomplir, dans quel contexte.",
              "Les signaux qui comptent : comportements observés, pas opinions.",
              "Écrire le problème en une phrase, sans aucun mot technique.",
            ],
            story:
              "Piste : une feature demandée sur une de tes apps (BeeDone, Evolum, UpDrive…) dont le vrai besoin était différent de la demande.",
            takeaway: "Ne code jamais une solution dont tu ne peux pas énoncer le problème.",
          },
        },
        skill: {
          name: "pe-problem-framing",
          description:
            "Reformule une demande de feature en problème utilisateur, hypothèse et métrique de succès.",
          body: `# Cadrer le problème

Prends la demande de l'utilisateur et produis :

1. **La demande telle quelle** (une ligne).
2. **Le problème** : qui, dans quelle situation, qu'est-ce qui le bloque. Aucun mot technique, aucune solution.
3. **L'hypothèse** : « Si on fait X, alors Y changera parce que Z. »
4. **La métrique** : un seul chiffre ou comportement qui dira si c'est réussi.
5. **Les questions ouvertes** : ce qu'il faut vérifier auprès d'un utilisateur avant de coder.

Si la demande est déjà un problème clair, dis-le et passe directement à l'hypothèse.`,
        },
        exercise: {
          id: "reformuler-demande",
          title: "Reformule une demande",
          brief:
            "Prends une demande de feature réelle (ton fil rouge, ton backlog, un client) et remonte au problème.",
          deliverable: "Demande, problème, hypothèse, métrique, et une question à poser à un utilisateur.",
          checklist: [
            "Le problème ne contient aucune solution",
            "L'hypothèse a la forme « si… alors… parce que… »",
            "Une seule métrique, mesurable",
          ],
        },
      },
      {
        id: "produit-prioriser",
        slug: "prioriser-et-decouper",
        title: "Prioriser et découper",
        summary:
          "Impact, effort, confiance : choisir ce qui passe en premier, puis découper jusqu'au plus petit incrément qui apprend quelque chose.",
        video: {
          status: "placeholder",
          targetMinutes: 8,
          prep: {
            hook: "La feature parfaite livrée dans trois mois perd contre la moitié de feature livrée vendredi.",
            keyPoints: [
              "Trois critères simples : impact, effort, confiance dans l'hypothèse.",
              "Découper verticalement : chaque incrément traverse toutes les couches et sert un utilisateur.",
              "Le plus petit incrément qui apprend : qu'est-ce qu'on saura après l'avoir livré ?",
              "Dire non (ou « pas maintenant ») avec un argument, pas une humeur.",
            ],
            story:
              "Piste : une V1 que tu as volontairement réduite, et ce que la mise en production t'a appris que la spec n'aurait jamais dit.",
            takeaway: "Livrer petit, c'est apprendre vite.",
          },
        },
        skill: {
          name: "pe-slice-scope",
          description:
            "Découpe une feature en incréments verticaux livrables, classés par valeur d'apprentissage.",
          body: `# Découper le périmètre

Pour la feature donnée :

1. Liste ce qu'elle contient dans sa version complète.
2. Propose trois incréments verticaux (chacun utilisable de bout en bout par un utilisateur).
3. Pour chaque incrément : ce qu'il livre, ce qu'il permet d'apprendre, l'effort estimé (S, M, L).
4. Recommande l'incrément à livrer en premier et ce qu'on laisse volontairement de côté.

Refuse les découpages horizontaux (« d'abord le back, puis le front ») : ils ne livrent rien à personne.`,
        },
        exercise: {
          id: "trois-increments",
          title: "Trois incréments",
          brief: "Découpe la feature de ton fil rouge en trois incréments verticaux et choisis le premier.",
          deliverable: "Trois incréments avec ce qu'ils apprennent, et le choix argumenté du premier.",
          checklist: [
            "Chaque incrément est utilisable par un utilisateur",
            "Chaque incrément dit ce qu'il permet d'apprendre",
            "Le premier choix est justifié par l'impact ou l'apprentissage",
          ],
        },
      },
      {
        id: "produit-risques",
        slug: "risques-et-tests",
        title: "Tester les risques avant le code",
        summary:
          "Valeur, utilisabilité, faisabilité, viabilité : repérer le risque qui peut tout faire tomber et le tester pour pas cher, avant de construire.",
        video: {
          status: "placeholder",
          targetMinutes: 9,
          prep: {
            hook: "Le code le plus cher, c'est celui qu'on jette parce que personne ne s'en sert.",
            keyPoints: [
              "Les quatre risques : est-ce qu'ils le veulent, est-ce qu'ils savent s'en servir, peut-on le construire, est-ce que ça tient pour le business.",
              "Trouver le risque numéro un de la feature.",
              "Des tests pas chers : maquette, fausse porte, concierge, prototype jetable.",
              "Après la livraison : mesurer, et décider (garder, corriger, retirer).",
            ],
            story:
              "Piste : une feature qui a échoué ou été retirée, et le test qui aurait pu l'éviter.",
            takeaway: "Teste le risque qui tue en premier, pas celui qui est facile à tester.",
          },
        },
        skill: {
          name: "pe-risk-map",
          description:
            "Dresse la carte des risques d'une feature (valeur, utilisabilité, faisabilité, viabilité) et propose le test le moins cher pour chacun.",
          body: `# Carte des risques

Pour la feature donnée, produis un tableau avec une ligne par risque :

| Risque | Question | Niveau (faible, moyen, fort) | Test le moins cher | Critère de réussite |

Les quatre risques : valeur (ils le veulent ?), utilisabilité (ils savent s'en servir ?), faisabilité (on peut le construire ?), viabilité (ça tient pour le business : coût, légal, support ?).

Termine en désignant le risque à tester en premier et le test à lancer cette semaine.`,
        },
        exercise: {
          id: "carte-risques",
          title: "Ta carte des risques",
          brief: "Remplis la carte des quatre risques pour ton premier incrément et choisis le test à lancer.",
          deliverable: "Le tableau des quatre risques et le test retenu, avec son critère de réussite.",
          checklist: [
            "Les quatre risques sont évalués",
            "Le test est faisable en moins d'une semaine",
            "Le critère de réussite est décidé avant le test",
          ],
        },
      },
    ],
  },
  {
    id: "design",
    slug: "design",
    order: 2,
    kicker: "Module 2",
    title: "Design : des choix d'interface défendables",
    tagline: "Le parcours avant l'écran, une hiérarchie claire, un test avec de vrais gens.",
    outcome:
      "Tu dessines un parcours complet avec tous ses états, tu critiques un écran avec des règles et tu testes un prototype en trente minutes.",
    lessons: [
      {
        id: "design-parcours",
        slug: "le-parcours",
        title: "Le parcours avant l'écran",
        summary:
          "On ne dessine pas un écran, on dessine un chemin. Et chaque étape a ses états : vide, chargement, erreur, succès.",
        video: {
          status: "placeholder",
          targetMinutes: 7,
          prep: {
            hook: "Ton écran est beau. Et quand la liste est vide ? Quand le réseau tombe ?",
            keyPoints: [
              "Le user flow : point d'entrée, étapes, sortie, en boîtes et flèches.",
              "Les états oubliés : premier usage, vide, chargement, erreur, hors ligne, succès.",
              "Le chemin le plus court vers la valeur : combien d'étapes avant le premier « ah, cool » ?",
              "Le dev a un avantage : il sait déjà où ça peut casser.",
            ],
            story:
              "Piste : un état vide ou une erreur mal gérée sur une de tes apps, et la version corrigée.",
            takeaway: "Un écran sans ses états n'est pas fini.",
          },
        },
        skill: {
          name: "pe-user-flow",
          description:
            "Décrit le parcours utilisateur d'une feature et liste tous les états à concevoir pour chaque étape.",
          body: `# Parcours et états

Pour la feature donnée :

1. Décris le parcours en étapes numérotées, du point d'entrée au résultat.
2. Compte les étapes avant la première valeur pour l'utilisateur et propose comment en retirer une.
3. Pour chaque étape, liste les états à concevoir : premier usage, vide, chargement, erreur, succès (et hors ligne si pertinent).
4. Signale les états absents des maquettes ou du code existant.

Rends le parcours sous forme de liste et, si l'outil le permet, d'un diagramme Mermaid.`,
        },
        exercise: {
          id: "flow-et-etats",
          title: "Ton parcours et ses états",
          brief: "Dessine le parcours de ton premier incrément et liste les états de chaque étape.",
          deliverable: "Le parcours (schéma ou liste) et la liste des états par étape.",
          checklist: [
            "Le parcours a un début et une fin clairs",
            "Les états vide, chargement et erreur sont prévus",
            "Tu as retiré au moins une étape inutile",
          ],
        },
      },
      {
        id: "design-hierarchie",
        slug: "hierarchie-et-systeme",
        title: "Hiérarchie visuelle et design system minimal",
        summary:
          "Une action principale par écran, de l'espace, une échelle typographique, des tokens. Assez de système pour être cohérent, pas plus.",
        video: {
          status: "placeholder",
          targetMinutes: 9,
          prep: {
            hook: "Si tout est important sur ton écran, rien ne l'est.",
            keyPoints: [
              "Une action principale par écran, visible en deux secondes.",
              "Hiérarchie : taille, graisse, couleur, espace. Dans cet ordre.",
              "Le design system minimal : couleurs, typo, espacements, rayons en tokens, puis quelques composants.",
              "Accessibilité de base : contraste, taille des cibles, focus visible.",
            ],
            story:
              "Piste : un avant/après d'un écran d'une de tes apps, et la règle qui a fait la différence.",
            takeaway: "Le design, c'est des choix que tu peux expliquer.",
          },
        },
        skill: {
          name: "pe-ui-review",
          description:
            "Critique un écran (capture ou code) avec des règles de hiérarchie, de cohérence et d'accessibilité, puis propose des corrections priorisées.",
          body: `# Revue d'interface

Analyse l'écran fourni (capture, maquette ou code) selon ces règles :

1. **Action principale** : est-elle unique et visible en deux secondes ?
2. **Hiérarchie** : la taille, la graisse et l'espace guident-ils l'œil dans le bon ordre ?
3. **Cohérence** : les couleurs, espacements et composants suivent-ils un système (tokens) ?
4. **États** : vide, chargement, erreur sont-ils traités ?
5. **Accessibilité** : contraste, taille des cibles tactiles, focus clavier, textes alternatifs.

Pour chaque problème : ce qui ne va pas, pourquoi, la correction. Classe les corrections par impact et finis par les trois à faire en premier.`,
        },
        exercise: {
          id: "critique-ecran",
          title: "Critique un écran",
          brief: "Prends un écran de ton fil rouge (ou d'une app que tu utilises) et passe-le aux cinq règles.",
          deliverable: "Les problèmes trouvés, les trois corrections prioritaires, et si possible l'avant/après.",
          checklist: [
            "Les cinq règles sont passées",
            "Chaque problème a une correction concrète",
            "Trois corrections sont priorisées",
          ],
        },
      },
      {
        id: "design-tester",
        slug: "tester-en-30-minutes",
        title: "Prototyper et tester en trente minutes",
        summary:
          "Cinq personnes, une tâche, aucune explication : tu vois en une demi-heure ce que tu n'aurais jamais vu seul.",
        video: {
          status: "placeholder",
          targetMinutes: 8,
          prep: {
            hook: "Tu ne peux pas tester ton interface. Tu sais déjà où cliquer.",
            keyPoints: [
              "Un prototype suffit : maquette cliquable ou build de dev.",
              "Le protocole : une tâche, tu te tais, tu observes, tu notes où ça bloque.",
              "Cinq personnes trouvent la plupart des gros problèmes.",
              "Trier : ce qui bloque, ce qui ralentit, ce qui agace.",
            ],
            story:
              "Piste : un test où un utilisateur a fait exactement l'inverse de ce que tu attendais.",
            takeaway: "Observe ce qu'ils font, pas ce qu'ils disent.",
          },
        },
        skill: {
          name: "pe-usability-test",
          description:
            "Prépare un test utilisateur court (script, tâches, grille d'observation) puis aide à synthétiser les résultats.",
          body: `# Test utilisateur express

**Préparation**, pour la feature donnée :
1. Une phrase d'accueil neutre (« on teste l'outil, pas toi »).
2. Deux ou trois tâches formulées comme des objectifs, jamais comme des instructions (« trouve… », pas « clique sur… »).
3. Une grille d'observation : réussite, temps, hésitations, citations.

**Synthèse**, quand l'utilisateur colle ses notes :
- Regroupe les observations en problèmes.
- Classe chaque problème : bloquant, ralentit, agace.
- Propose une correction pour chaque bloquant.`,
        },
        exercise: {
          id: "test-utilisateur",
          title: "Ton premier test",
          brief: "Teste ton prototype (ou un écran existant) avec au moins trois personnes.",
          deliverable: "Le script utilisé, les problèmes classés et les corrections des bloquants.",
          checklist: [
            "Au moins trois personnes testées",
            "Les tâches sont des objectifs, pas des instructions",
            "Les problèmes sont classés par gravité",
          ],
        },
      },
    ],
  },
  {
    id: "tech",
    slug: "tech",
    order: 3,
    kicker: "Module 3",
    title: "Tech : la technique au service du produit",
    tagline: "Une stack choisie avec des critères, des données pensées pour l'usage, une livraison mesurée.",
    outcome:
      "Tu défends un choix de stack par écrit, tu modélises tes données à partir des usages et tu livres avec un plan de mesure.",
    lessons: [
      {
        id: "tech-stack",
        slug: "choisir-sa-stack",
        title: "Choisir sa stack sans religion",
        summary:
          "Équipe, délai, coût, échelle, recrutement : on choisit avec des critères et on l'écrit dans une décision d'architecture (ADR).",
        video: {
          status: "placeholder",
          targetMinutes: 9,
          prep: {
            hook: "La meilleure stack n'existe pas. La meilleure stack pour ce produit, cette équipe et ce délai, si.",
            keyPoints: [
              "Les critères : ce que l'équipe maîtrise, le délai, le coût, l'échelle réelle (pas rêvée), le recrutement.",
              "Le backend managé (Firebase, Supabase) contre un backend maison : quand chacun gagne.",
              "L'ADR : contexte, options, décision, conséquences. Une page.",
              "Prévoir la sortie : qu'est-ce qui coûterait cher à changer ?",
            ],
            story:
              "Piste : pourquoi cette formation tourne sur Next.js + Firebase, et ce que tu aurais choisi dans un autre contexte.",
            takeaway: "Un choix technique non écrit sera rediscuté à chaque réunion.",
          },
        },
        skill: {
          name: "pe-stack-decision",
          description:
            "Compare des options techniques avec des critères produit et rédige une décision d'architecture (ADR) d'une page.",
          body: `# Décision d'architecture (ADR)

À partir du contexte donné :

1. **Contexte** : le produit, l'équipe, le délai, le budget, l'échelle attendue.
2. **Options** : deux ou trois options réalistes.
3. **Comparaison** : un tableau sur ces critères : maîtrise de l'équipe, délai de mise en production, coût mensuel, échelle, facilité de recrutement, coût de sortie.
4. **Décision** : l'option retenue et la raison principale, en une phrase.
5. **Conséquences** : ce qu'on gagne, ce qu'on accepte de perdre, le signal qui ferait revoir la décision.

Une page maximum. Pas d'option fantaisiste pour faire nombre.`,
        },
        exercise: {
          id: "ecrire-adr",
          title: "Écris ton ADR",
          brief: "Rédige la décision de stack de ton fil rouge, même si elle te paraît évidente.",
          deliverable: "Un ADR d'une page : contexte, options, comparaison, décision, conséquences.",
          checklist: [
            "Au moins deux options comparées",
            "Les critères partent du produit et de l'équipe",
            "Le signal qui ferait revoir la décision est écrit",
          ],
        },
      },
      {
        id: "tech-donnees",
        slug: "modeliser-les-donnees",
        title: "Modéliser les données à partir des usages",
        summary:
          "On part des écrans et des requêtes, pas des entités. Lectures, écritures, droits d'accès : le modèle sert l'usage.",
        video: {
          status: "placeholder",
          targetMinutes: 10,
          prep: {
            hook: "Ton modèle de données est parfait sur le papier. Et ton écran d'accueil fait quarante requêtes.",
            keyPoints: [
              "Lister les écrans, puis les lectures et écritures de chaque écran.",
              "NoSQL (Firestore) : on modélise pour les lectures, on accepte la duplication.",
              "SQL : on normalise, on indexe pour les requêtes réelles.",
              "Les règles d'accès font partie du modèle : qui lit, qui écrit quoi.",
            ],
            story:
              "Piste : un modèle de données que tu as dû refaire sur une de tes apps parce qu'il ne collait pas à l'usage.",
            takeaway: "Le bon modèle est celui qui rend l'écran le plus fréquent simple et rapide.",
          },
        },
        skill: {
          name: "pe-data-model",
          description:
            "Dérive un modèle de données (SQL ou Firestore) des écrans et des usages, avec index et règles d'accès.",
          body: `# Modèle de données par l'usage

Pour la feature donnée :

1. Liste les écrans et, pour chacun, les lectures et écritures (fréquence estimée).
2. Propose le modèle : collections ou tables, champs, types.
3. Pour chaque lecture fréquente, montre la requête et l'index nécessaire.
4. Écris les règles d'accès (qui lit, qui écrit, quoi) : règles Firestore ou politiques SQL.
5. Signale les points de duplication et comment ils restent cohérents.

Justifie le choix NoSQL ou SQL par les usages, pas par préférence.`,
        },
        exercise: {
          id: "modele-donnees",
          title: "Le modèle de ton fil rouge",
          brief: "Modélise les données de ton premier incrément en partant de ses écrans.",
          deliverable: "Écrans et requêtes, schéma des données, index et règles d'accès.",
          checklist: [
            "Chaque écran a ses lectures et écritures",
            "Les requêtes fréquentes ont leur index",
            "Les règles d'accès sont écrites",
          ],
        },
      },
      {
        id: "tech-livrer",
        slug: "livrer-et-mesurer",
        title: "Livrer, mesurer, itérer",
        summary:
          "Feature flags, événements analytics, budget de performance, suivi des erreurs : la livraison n'est pas la fin, c'est le début de la mesure.",
        video: {
          status: "placeholder",
          targetMinutes: 9,
          prep: {
            hook: "« C'est en prod. » Super. Et comment tu sais que ça marche ?",
            keyPoints: [
              "Le plan de mesure s'écrit avant le code : quels événements, quelle métrique de succès (celle du module produit).",
              "Livrer derrière un flag, à une partie des utilisateurs d'abord.",
              "Surveiller : erreurs, performance, la métrique de succès.",
              "Décider après deux semaines : garder, corriger, retirer. Et le dire.",
            ],
            story:
              "Piste : une mise en production où les chiffres ont contredit ton intuition.",
            takeaway: "Une feature sans mesure est une opinion en production.",
          },
        },
        skill: {
          name: "pe-ship-measure",
          description:
            "Prépare la mise en production d'une feature : plan d'événements analytics, flag, surveillance et critères de décision.",
          body: `# Livrer et mesurer

Pour la feature donnée, produis :

1. **La métrique de succès** (reprise du cadrage produit) et sa valeur cible.
2. **Le plan d'événements** : nom, moment de déclenchement, propriétés. Noms en snake_case, verbe au passé (\`invoice_exported\`).
3. **Le déploiement** : flag, population de départ, étapes d'élargissement.
4. **La surveillance** : erreurs à suivre, budget de performance, alertes.
5. **La décision** : à quelle date on regarde les chiffres, et ce qui fait garder, corriger ou retirer la feature.

Termine par une checklist de mise en production cochable.`,
        },
        exercise: {
          id: "plan-de-livraison",
          title: "Ton plan de livraison (projet final)",
          brief:
            "Rassemble ton fil rouge : problème, incrément, parcours, ADR, modèle, et ajoute le plan de mesure. C'est le dossier que tu montres en entretien.",
          deliverable:
            "Un dossier d'une à deux pages : le problème, les décisions produit, design et tech, et le plan de mesure.",
          checklist: [
            "La métrique de succès a une valeur cible",
            "Les événements analytics sont nommés",
            "La date et les critères de décision sont fixés",
            "Le dossier tient en deux pages",
          ],
        },
      },
    ],
  },
];
