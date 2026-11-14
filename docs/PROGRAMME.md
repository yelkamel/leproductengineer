# Le Product Engineer — le programme V1 en un coup d'œil

> Gratuit, sur inscription. 1 introduction + 3 modules = **11 leçons**, chacune avec
> **1 vidéo** (placeholder + notes de tournage), **1 exercice** sur le projet fil rouge et
> **1 skill** (SKILL.md pour l'agent IA). Environ **87 minutes** de vidéo à tourner.

```
 INTRODUCTION ──► MODULE 1 PRODUIT ──► MODULE 2 DESIGN ──► MODULE 3 TECH ──► DOSSIER FINAL
 le rôle +        comprendre avant      des choix d'UI       la tech au         (montrable en
 fil rouge        de construire         défendables          service du produit  entretien)
```

| # | Leçon | Vidéo | Exercice (livrable) | Skill |
|---|---|---|---|---|
| **0** | **Introduction : ce qu'est vraiment un Product Engineer** | | | |
| 0.1 | Du dev qui exécute au dev qui décide | ~6 min | Auto-diagnostic sur les 3 casquettes | `pe-role-check` |
| 0.2 | Comment suivre la formation | ~4 min | Choisir son projet fil rouge | `pe-fil-rouge` |
| **1** | **Produit : comprendre avant de construire** | | | |
| 1.1 | Trouver le vrai problème | ~8 min | Reformuler une demande en problème + hypothèse + métrique | `pe-problem-framing` |
| 1.2 | Prioriser et découper | ~8 min | Trois incréments verticaux | `pe-slice-scope` |
| 1.3 | Tester les risques avant le code | ~9 min | Carte des 4 risques + test à lancer | `pe-risk-map` |
| **2** | **Design : des choix d'interface défendables** | | | |
| 2.1 | Le parcours avant l'écran | ~7 min | User flow + tous les états | `pe-user-flow` |
| 2.2 | Hiérarchie visuelle et design system minimal | ~9 min | Critique d'un écran (5 règles) | `pe-ui-review` |
| 2.3 | Prototyper et tester en 30 minutes | ~8 min | Test avec 3+ personnes | `pe-usability-test` |
| **3** | **Tech : la technique au service du produit** | | | |
| 3.1 | Choisir sa stack sans religion | ~9 min | Écrire un ADR | `pe-stack-decision` |
| 3.2 | Modéliser les données à partir des usages | ~10 min | Modèle de données + règles d'accès | `pe-data-model` |
| 3.3 | Livrer, mesurer, itérer | ~9 min | **Projet final** : dossier de décisions + plan de mesure | `pe-ship-measure` |

## Ce que voit l'apprenant

1. Landing → « Commencer gratuitement » → inscription (e-mail ou Google).
2. Tableau de bord : progression globale, bouton « Reprendre », les 4 blocs et leurs leçons.
3. Page leçon : vidéo (ou placeholder « Vidéo en préparation » + notes), exercice avec
   checklist et réponse enregistrée, skill à copier ou télécharger, « Marquer comme terminée »,
   leçon précédente / suivante.

## Notes de tournage

Chaque vidéo a dans `packages/curriculum/src/content.ts` : **hook** (les 10 premières
secondes), **points clés** dans l'ordre, **histoire à raconter** (une piste à choisir parmi
tes vraies apps) et **la phrase à retenir**. Elles s'affichent aussi sous le placeholder.

## Hors V1 (volontairement)

Bonus marketing, mini web app de choix de stack, paiement, emails, certificat. Ils
viennent après les trois modules (cf. journal du 2026-11-13).
