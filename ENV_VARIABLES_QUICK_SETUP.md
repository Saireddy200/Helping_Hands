# 🎯 Vercel Environment Variables - Step-by-Step

## The Error You're Getting
```
Environment Variable "MONGODB_URI" references Secret "MONGODB_URI", which does not exist.
```

This means Vercel is looking for `MONGODB_URI` in the environment variables but it hasn't been set yet.

---

## 📋 Complete Setup Checklist

- [ ] Have MongoDB connection string ready
- [ ] Have JWT secret ready (any random string)
- [ ] Access Vercel dashboard
- [ ] Go to your Helping_Hands project
- [ ] Add MONGODB_URI environment variable
- [ ] Add JWT_SECRET environment variable
- [ ] Redeploy the project
- [ ] Verify deployment succeeds

---

## 🚀 Quick Setup (5 minutes)

### 1️⃣ Get Your MongoDB Connection String

**From MongoDB Atlas:**
```
1. Go to https://cloud.mongodb.com
2. Click your cluster
3. Click "Connect" button
4. Click "Drivers" (or "Connect your application")
5. Copy the connection string
6. Replace <password> with your actual password
7. Replace myFirstDatabase with "helpinghands"
```

**Example final URL:**
```
mongodb+srv://saisrinureddy809:MyPassword123@cluster0.yn0xsqs.mongodb.net/helpinghands?retryWrites=true&w=majority
```

### 2️⃣ Open Vercel Project Settings

```
1. https://vercel.com/dashboard
2. Click "Helping_Hands" project
3. Click "Settings" tab
4. Click "Environment Variables" in left menu
```

### 3️⃣ Add MONGODB_URI

```
Field: MONGODB_URI
Value: mongodb+srv://...your_connection_string...
Select: All (or Development, Preview, Production)
Click: Save
```

### 4️⃣ Add JWT_SECRET

```
Field: JWT_SECRET
Value: your_random_secret_key_here_12345
Select: All
Click: Save
```

### 5️⃣ Add NODE_ENV (Optional)

```
Field: NODE_ENV
Value: production
Select: Production
Click: Save
```

### 6️⃣ Redeploy

```
1. Click "Deployments" tab
2. Find latest deployment
3. Click menu "..."
4. Click "Redeploy"
5. Wait for build to complete
```

---

## ✅ What You Should See

### After Variables Are Added:
```
Environment Variables
├── MONGODB_URI: mongodb+srv://...
├── JWT_SECRET: your_secret_here
└── NODE_ENV: production
```

### After Redeployment:
```
✅ Building...
✅ Installation successful
✅ Vite build complete
✅ Deployment successful
✅ Live at: https://your-project.vercel.app
```

---

## 🔧 Troubleshooting

### Issue: "Can't find MongoDB connection string"
**Solution:**
1. Go to https://cloud.mongodb.com
2. Log in with your email
3. Click Clusters
4. Find your cluster (should have campaigns data)
5. Click "Connect"
6. Copy connection string

### Issue: "MongoDB connection timeout"
**Solution:**
1. Go to MongoDB Atlas
2. Click "Network Access"
3. Add IP: `0.0.0.0/0`
4. Or: Add `Vercel` IP ranges
5. Click "Confirm"

### Issue: "Build still failing after adding variables"
**Solution:**
1. Vercel Dashboard → Settings → Deployments
2. Click "Clear Cache"
3. Go to Deployments
4. Click "Redeploy" on latest
5. Wait 5-10 minutes

### Issue: "JWT errors after deployment"
**Solution:**
1. Check JWT_SECRET is set (at least 8 characters)
2. Make sure it's consistent
3. Redeploy

---

## 📱 Environment Variables Reference

**Used in your code:**

### Backend (server/server.js)
```javascript
const mongoUrl = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;
```

### Frontend (client/.env)
```
VITE_API_URL=https://your-vercel-domain.vercel.app
```

---

## 🎯 Final Checklist Before Deploying

- ✅ MONGODB_URI set in Vercel
- ✅ JWT_SECRET set in Vercel
- ✅ MongoDB IP whitelist updated
- ✅ All files pushed to GitHub
- ✅ Redeploy triggered
- ✅ Build logs show success
- ✅ Site is live

---

## 📞 Need Help?

**If deployment still fails:**
1. Check Vercel build logs (click on deployment)
2. Look for specific error messages
3. Check MongoDB connection string for typos
4. Ensure MongoDB database exists
5. Verify IP whitelist is open

---

## ✨ Success! 🎉

When everything works:
- ✅ Site loads at your Vercel URL
- ✅ Campaigns page shows campaigns
- ✅ Can make donations
- ✅ Dashboard shows records
- ✅ All features working

**You're done!** Your HelpingHands platform is live! 🚀

