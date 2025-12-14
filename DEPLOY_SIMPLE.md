
## ÉTAPE 4 : Tester (2 minutes)

### 4.1 Tester le frontend


### Le frontend ne peut pas se connecter au backend

1. Vérifiez que `VITE_API_URL` est correcte :
   - Doit être l'URL complète du backend (sans `/api` à la fin)
   - Exemple : `https://alcool-tracker-backend-xxxxx.vercel.app`

2. Vérifiez que `FRONTEND_URL` dans le backend correspond au frontend

3. Ouvrez la console du navigateur (F12) et regardez les erreurs

### La base de données ne fonctionne pas

1. Vérifiez que la connection string est correcte :
   - Testez avec `npx prisma studio` en local
   - Vérifiez que le mot de passe est correct

2. Vérifiez que les migrations sont exécutées :
   - En local : `cd backend && npx prisma migrate deploy`

---

## 📞 Besoin d'aide ?

Si vous êtes bloqué, vérifiez :
1. Les logs dans Vercel (Deployments → Logs)
2. La console du navigateur (F12)
3. Le guide détaillé : `VERCEL_DEPLOYMENT.md`

---

**Félicitations ! Votre application est maintenant en ligne ! 🚀**

