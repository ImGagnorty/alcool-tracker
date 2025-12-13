# Guide de Déploiement - AlcoolTracker PWA

Ce guide explique comment déployer AlcoolTracker en tant que Progressive Web App (PWA) sur le web, permettant aux utilisateurs de l'installer sur leurs appareils mobiles sans passer par l'App Store.

## 🎯 Avantages du PWA

- ✅ **Gratuit** : Pas besoin de payer les frais d'App Store (99$/an pour Apple, 25$ une fois pour Google)
- ✅ **Installation directe** : Les utilisateurs peuvent installer l'app depuis leur navigateur
- ✅ **Fonctionne hors ligne** : Service Worker pour le cache
- ✅ **Expérience native** : Se comporte comme une app native une fois installée
- ✅ **Multi-plateforme** : Fonctionne sur iOS, Android, Windows, macOS, Linux

## 📋 Prérequis

1. Un serveur web (Vercel, Netlify, AWS, etc.)
2. Un domaine (optionnel mais recommandé)
3. HTTPS (obligatoire pour les PWA)

## 🚀 Déploiement

### Option 1 : Vercel (Recommandé - Gratuit)

1. **Installer Vercel CLI** :
```bash
npm install -g vercel
```

2. **Se connecter** :
```bash
vercel login
```

3. **Déployer le frontend** :
```bash
cd frontend
vercel
```

4. **Déployer le backend** :
```bash
cd backend
vercel
```

5. **Configurer les variables d'environnement** dans le dashboard Vercel :
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `PORT`

### Option 2 : Netlify (Gratuit)

1. **Installer Netlify CLI** :
```bash
npm install -g netlify-cli
```

2. **Déployer** :
```bash
cd frontend
npm run build
netlify deploy --prod
```

3. **Configurer le backend** sur un service comme Railway, Render, ou Heroku

### Option 3 : Build manuel

1. **Build du frontend** :
```bash
cd frontend
npm run build
```

2. **Le dossier `dist/` contient les fichiers à déployer**

3. **Uploader sur votre serveur** (via FTP, SCP, etc.)

## 🔧 Configuration

### 1. Créer les icônes

Avant de déployer, créez les icônes PNG nécessaires :

- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

Utilisez le fichier `frontend/public/icon.svg` comme base.

**Outils recommandés** :
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [PWA Builder](https://www.pwabuilder.com/imageGenerator)
- [Favicon.io](https://favicon.io/)

### 2. Configurer l'API

Assurez-vous que l'URL de l'API backend est correctement configurée dans `frontend/src/services/api.ts`.

Pour la production, modifiez la base URL :
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'https://votre-api.com';
```

### 3. Variables d'environnement

Créez un fichier `.env.production` dans `frontend/` :
```
VITE_API_URL=https://votre-api.com
```

## 📱 Installation sur mobile

### Android (Chrome)

1. Ouvrir le site dans Chrome
2. Un prompt d'installation apparaîtra automatiquement
3. Ou cliquer sur le menu (⋮) → "Ajouter à l'écran d'accueil"

### iOS (Safari)

1. Ouvrir le site dans Safari
2. Cliquer sur le bouton de partage (□↑)
3. Sélectionner "Sur l'écran d'accueil"
4. Ajouter

### Desktop

- **Chrome/Edge** : Icône d'installation dans la barre d'adresse
- **Firefox** : Menu → "Installer"

## 🔍 Vérification

1. **Tester le manifest** :
   - Ouvrir DevTools → Application → Manifest
   - Vérifier que tout est correct

2. **Tester le Service Worker** :
   - DevTools → Application → Service Workers
   - Vérifier qu'il est actif

3. **Test Lighthouse** :
   - DevTools → Lighthouse → PWA
   - Score minimum recommandé : 90+

## 🐛 Dépannage

### L'app ne s'installe pas

- Vérifier que HTTPS est activé
- Vérifier que le manifest.json est accessible
- Vérifier que les icônes existent et sont accessibles
- Vérifier la console pour les erreurs

### Le Service Worker ne fonctionne pas

- Vérifier que le build a bien généré les fichiers SW
- Vérifier les permissions dans le navigateur
- Vérifier la console pour les erreurs

### L'app ne fonctionne pas hors ligne

- Vérifier la configuration Workbox dans `vite.config.ts`
- Vérifier que les ressources sont bien mises en cache

## 📚 Ressources

- [MDN - Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev - PWA](https://web.dev/progressive-web-apps/)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)

## 🎉 C'est tout !

Votre application est maintenant déployée en tant que PWA. Les utilisateurs peuvent l'installer directement depuis leur navigateur, sans passer par les stores d'applications !

