# Nathalie is the best ✈️ — English for travel

Un petit site-application pour aider Nathalie à réviser l'anglais et voyager avec confiance :
un **test de niveau**, un **programme sur mesure** (grammaire + vocabulaire), des **leçons** simples,
des **vidéos** intégrées, et de la **synthèse vocale** pour écouter la prononciation.
Le tout **installable comme une vraie app** sur le téléphone. 💛

---

## 📁 Ce qu'il y a dans le dossier

```
index.html              → le site (tout est dedans)
manifest.webmanifest    → pour l'installation en app
sw.js                   → pour que l'app marche même hors ligne
icons/                  → les icônes de l'app
README.md               → ce mode d'emploi
```

Ne renomme rien : les fichiers se parlent entre eux.

---

## ✨ Ce que Nathalie va apprendre

**9 escales (modules)**, chacune avec **30 mots et expressions**, la prononciation approximative
écrite, la grammaire clé, un mini-exercice et une vidéo :

1. 👋 Bonjour & se présenter
2. 🛫 À l'aéroport & dans l'avion
3. 🏨 À l'hôtel
4. 🍽️ Au restaurant
5. 🧭 Demander son chemin
6. 🛍️ Faire les courses & les nombres
7. 🚑 Urgences & santé
8. 💬 Petites conversations
9. 🤝 **Se faire des amis** (proposer un verre, échanger ses contacts, papoter)

👉 Dans chaque leçon, **il suffit d'appuyer sur le bouton 🔊 à côté d'un mot pour l'entendre**
prononcé à voix haute. Le bouton **« Tout écouter »** enchaîne tous les mots l'un après l'autre.
Chaque escale terminée donne un **tampon** dans le passeport (avec des confettis 🎉).

> La voix utilise la synthèse vocale du téléphone : sa qualité dépend de l'appareil, mais elle
> fonctionne sur presque tous les mobiles récents.

---

## 🚀 Mettre le site en ligne sur GitHub (gratuit)

1. Crée un compte sur **github.com** (si ce n'est pas déjà fait).
2. Clique sur **New repository** (nouveau dépôt).
   - Nom au choix, par exemple : `nathalie-english`
   - Coche **Public**, puis **Create repository**.
3. Sur la page du dépôt, clique **Add file → Upload files**.
   - Glisse **tout le contenu de ce dossier** (le fichier `index.html`, `manifest.webmanifest`,
     `sw.js`, et **le dossier `icons`**).
   - Clique **Commit changes**.
4. Va dans **Settings** (⚙️) → menu de gauche **Pages**.
   - Sous *Build and deployment* → *Source*, choisis **Deploy from a branch**.
   - Branch : **main** — dossier : **/ (root)** → **Save**.
5. Attends 1–2 minutes, recharge la page. GitHub affiche un lien du type :
   `https://TON-NOM.github.io/nathalie-english/`
6. C'est en ligne ! Envoie ce lien à Nathalie. 🎉

> Astuce : l'adresse se termine par le nom du dépôt. Si tu appelles le dépôt
> `nathalie-english`, le lien sera `https://TON-NOM.github.io/nathalie-english/`.

---

## 📱 Installer l'app sur le téléphone

Ouvre le lien dans le navigateur du téléphone, puis :

**Sur Android (Chrome)**
- Un bouton **« ⬇ Installer l'app »** apparaît en haut à droite → appuie dessus.
- (ou : menu **⋮** en haut à droite → **Installer l'application / Ajouter à l'écran d'accueil**.)

**Sur iPhone / iPad (Safari)**
- Appuie sur le bouton **Partager** ⬆️ (le carré avec la flèche, en bas).
- Choisis **« Sur l'écran d'accueil »** → **Ajouter**.

L'icône « Nathalie EN » apparaît alors sur l'écran d'accueil, comme une vraie application.
Elle s'ouvre en plein écran et fonctionne même sans connexion
(sauf les vidéos, qui viennent de YouTube et ont besoin d'internet).

---

## 🔧 Personnaliser (facile)

Tout se modifie dans **`index.html`** :

- **Les phrases du jour** : cherche `const PHRASES` (tout en haut du script).
- **Les questions du test** : cherche `const DIAGNOSTIC`.
- **Les leçons** (vocabulaire, grammaire, vidéos) : cherche `const MODULES`.
  - Pour changer une vidéo, remplace le code après `id:` (c'est l'identifiant YouTube,
    la partie après `watch?v=` dans l'adresse d'une vidéo).

---

## 🔒 Vie privée

Aucune donnée n'est envoyée sur un serveur. La progression de Nathalie
(tampons, score du test) reste **sur son téléphone**, dans le navigateur.

---

Fait avec ❤️ pour Nathalie — *the best*.
