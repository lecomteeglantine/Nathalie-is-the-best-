# Nathalie is the best ✈️ — English for travel

Application d’anglais conçue pour aider Nathalie à voyager avec davantage d’aisance et d’autonomie.

🌍 **Site :** https://lecomteeglantine.github.io/Nathalie-is-the-best-/

## V13.1 · audit complet du 31 août 2026

Cette version conserve toutes les fonctions de V13 et ajoute les correctifs issus d’un audit complet :

- positions des bonnes réponses rééquilibrées dans les banques de QCM, sans modifier le contenu évalué ;
- correction de la traduction de **fair enough** ;
- sauvegarde/import renforcé avec point de retour fiable avant import ;
- affichage sécurisé des données importées sur la page de sauvegarde ;
- limites des objectifs hebdomadaires cohérentes après restauration ;
- service worker plus robuste : le gros MP3 ou une icône ne peuvent plus faire échouer l’installation de toute la PWA ;
- prise en charge des requêtes audio `Range` pour améliorer lecture, boucle et recherche dans le MP3 hors connexion ;
- conservation séparée en cache de l’accueil et de la page de sauvegarde ;
- cibles tactiles agrandies sur mobile et barre supérieure corrigée jusqu’à 320 px ;
- navigation clavier des onglets du passeport et autres correctifs d’accessibilité conservés ;
- trois références vidéo externes incertaines remplacées par des ressources vérifiées et pertinentes ;
- libellés de version et diagnostic harmonisés.

## Contenu

- parcours progressif A1 → C1 : **24 escales** et **720 mots / expressions** ;
- test de niveau interne et recommandations personnalisées ;
- vocabulaire, grammaire, révisions et quatre jeux ;
- six missions de voyage et entraînement oral ;
- Listening Lab et six Pronunciation Labs ;
- Progress Checks internes A1 → C1 ;
- passeport de progression ;
- Trip Planner, Final Travel Check et Travel Mode ;
- synthèse vocale anglaise avec préférence pour une voix britannique ;
- bouton **Music ON/OFF** avec musique locale Suno ;
- page guidée de **sauvegarde / transfert** entre appareils ;
- installation PWA et contenu local disponible hors connexion après mise en cache.

Les vidéos YouTube restent externes et nécessitent internet.

## Fichiers utiles

```text
index.html
sauvegarde-progression.html
manifest.webmanifest
sw.js
assets/
  nathalie-city-travel-theme.mp3
icons/
  apple-touch-icon.png
  favicon-32.png
  icon-192.png
  icon-512.png
  maskable-512.png
README.md
```

## Vie privée

Aucun compte n’est nécessaire. La progression, les préférences et les données d’apprentissage restent dans le stockage local du navigateur. Les sauvegardes sont des fichiers JSON créés localement. Les enregistrements vocaux ne sont pas envoyés par le site.

---

Fait avec ❤️ pour Nathalie — the best.
