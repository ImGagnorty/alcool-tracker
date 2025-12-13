# ⚡ Démarrage Rapide - AlcoolTracker

Guide ultra-rapide en 4 étapes pour déployer votre application.

## 🎯 Résumé Express

1. **Supabase** → Créer projet → Copier connection string
2. **Vercel Backend** → Importer repo → Configurer → Déployer
3. **Vercel Frontend** → Importer repo → Configurer → Déployer
4. **Tester** → Ouvrir l'URL → Vérifier que ça marche

**Temps total : 15 minutes**

---

## 📝 Checklist Rapide

### Avant de commencer

- [ ] Code poussé sur GitHub
- [ ] Compte Supabase créé
- [ ] Compte Vercel créé

### Base de données

- [ ] Projet Supabase créé
- [ ] Connection string copiée (avec mot de passe)
- [ ] Connection string testée (optionnel : `npx prisma studio`)

### Backend Vercel

- [ ] Projet créé (Root Directory : `backend`)
- [ ] Variables d'environnement ajoutées :
  - [ ] `DATABASE_URL` (avec `?sslmode=require`)
  - [ ] `JWT_SECRET` (généré)
  - [ ] `FRONTEND_URL` (temporaire : `http://localhost:3000`)
  - [ ] `NODE_ENV` = `production`
- [ ] Déployé avec succès
- [ ] URL backend notée
- [ ] Test `/api/health` fonctionne

### Frontend Vercel

- [ ] Projet créé (Root Directory : `frontend`)
- [ ] Variable d'environnement ajoutée :
  - [ ] `VITE_API_URL` = URL du backend
- [ ] Déployé avec succès
- [ ] URL frontend notée

### Finalisation

- [ ] `FRONTEND_URL` dans le backend mis à jour avec l'URL du frontend
- [ ] Backend redéployé
- [ ] Frontend testé dans le navigateur
- [ ] Inscription/Connexion testée

---

## 🔗 Liens Utiles

- **Supabase** : https://supabase.com
- **Vercel** : https://vercel.com
- **Guide détaillé** : `DEPLOY_SIMPLE.md`
- **Guide complet** : `VERCEL_DEPLOYMENT.md`

---

## 💡 Astuces

1. **Gardez vos URLs** : Notez-les quelque part, vous en aurez besoin
2. **Testez au fur et à mesure** : Ne passez pas à l'étape suivante si la précédente ne fonctionne pas
3. **Vérifiez les logs** : En cas d'erreur, regardez les logs dans Vercel
4. **Console navigateur** : Ouvrez F12 pour voir les erreurs

---

**Prêt ?** Suivez `DEPLOY_SIMPLE.md` pour le guide détaillé ! 🚀

