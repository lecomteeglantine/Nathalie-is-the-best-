# Nathalie is the best ✈️ — English for travel

Application d’anglais conçue pour aider Nathalie à voyager avec davantage d’aisance et d’autonomie.

🌍 **Site :** https://lecomteeglantine.github.io/Nathalie-is-the-best-/

## Contenu

- parcours progressif A1 → C1 : **24 escales** et **720 mots / expressions** ;
- test de niveau et recommandations personnalisées ;
- vocabulaire, grammaire, révisions et jeux ;
- missions de voyage et entraînement oral ;
- Listening Lab et Pronunciation Lab ;
- Progress Checks internes ;
- passeport de progression ;
- Trip Planner, Final Travel Check et Travel Mode ;
- synthèse vocale anglaise avec préférence pour une voix britannique ;
- installation en PWA et fonctionnement hors connexion pour le contenu local ;
- **V13 : bouton Music ON/OFF** pour une musique d’ambiance locale ;
- **V13 : page guidée de sauvegarde / transfert** de la progression entre appareils.

Les vidéos externes, notamment YouTube, nécessitent une connexion internet.

## Fichiers du site

```text
index.html
sauvegarde-progression.html
manifest.webmanifest
sw.js
icons/
  apple-touch-icon.png
  favicon-32.png
  icon-192.png
  icon-512.png
  maskable-512.png
assets/
  README-MUSIC.txt
  nathalie-city-travel-theme.mp3   ← à ajouter après génération Suno
README.md
```

## Vie privée

Aucun compte n’est nécessaire. La progression, les préférences et les données d’apprentissage restent dans le stockage local du navigateur. Les enregistrements vocaux ne sont pas envoyés par le site.

## Mise à jour

Le site est publié avec GitHub Pages depuis la branche `main`. Après une mise à jour importante, un rechargement forcé peut être utile afin de remplacer une ancienne version conservée par le service worker.

---

Fait avec ❤️ pour Nathalie — the best.


## V13 · musique

Le bouton `Music ON/OFF` utilise `assets/nathalie-city-travel-theme.mp3`. Le ZIP contient le prompt Suno et les instructions dans `assets/README-MUSIC.txt`. Tant que le MP3 n’est pas ajouté, le bouton reste sans danger et affiche un message explicatif.

## V13 · sauvegarde

La page `sauvegarde-progression.html` exporte les données locales Nathalie dans un JSON et sait réimporter ce nouveau format ainsi que les anciens exports rapides de l’application. Rien n’est envoyé sur un serveur.
