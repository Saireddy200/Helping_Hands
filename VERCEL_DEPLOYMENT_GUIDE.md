# 🚀 Vercel Deployment Guide - HelpingHands

## Issue & Solution

### ❌ Error Encountered
```
sh: line 1: vite: command not found
Error: Command "npm run build" exited with 127
```

### ✅ Root Cause
Vite was not installed during the build process because `npm install` wasn't run in the client directory before `vite build`.

### ✅ Solution Applied

I've updated your configuration for proper Vercel deployment:

---

## 📁 Files Updated

### 1. **vercel.json** (Updated)
- Configured as a monorepo with separate builds for frontend and backend
- Frontend: Uses `@vercel/static-build` for Vite React
- Backend: Uses `@vercel/node` for Express server
- Routes configured to serve frontend and proxy API calls

### 2. **package.json** (Updated)
- Updated build script: `"build": "npm install && cd client && npm install && npm run build"`
- Ensures all dependencies are installed before building

### 3. **.vercelignore** (Created)
- Excludes unnecessary files from deployment
- Reduces build time and deployment size

### 4. **build.sh** (Created)
- Helper script for local testing of build process

---

## 🔧 Deployment Steps

### Option 1: Using Vercel Dashboard (Recommended)

1. **Go to:** https://vercel.com/new

2. **Import Project:**
   - Connect your GitHub repository: `https://github.com/Saireddy200/Helping_Hands`
   - Select your GitHub account
   - Choose "Helping_Hands" repository

3. **Configure Environment:**
   - Project name: `helping-hands`
   - Framework: `Other` (monorepo)
   - Root directory: `./` (leave default)

4. **Set Environment Variables:**
   Click "Environment Variables" and add:
   ```
   MONGODB_URI = your_mongodb_connection_string
   JWT_SECRET = your_jwt_secret_key
   NODE_ENV = production
   ```

5. **Deploy!**
   - Click "Deploy"
   - Vercel will automatically build and deploy

---

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Navigate to your project
cd "d:\Projects\New folder (2)"

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Set environment variables when prompted
```

---

## 🔐 Environment Variables Required

Add these to Vercel project settings:

| Variable | Value | Example |
|----------|-------|---------|
| `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/helpinghands?retryWrites=true&w=majority` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_very_secure_random_string_here` |
| `NODE_ENV` | `production` | `production` |
| `VITE_API_URL` | Your backend API URL | `https://your-domain.vercel.app/api` |

---

## 📝 vercel.json Configuration Explained

```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    },
    {
      "src": "server/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "client/dist/$1",
      "methods": ["GET", "HEAD", "OPTIONS"]
    },
    {
      "src": "/(.*)",
      "dest": "client/dist/index.html"
    }
  ]
}
```

**What this does:**
- ✅ Builds React frontend with Vite → `client/dist`
- ✅ Builds Express backend → `server/server.js`
- ✅ Routes `/api/*` to backend server
- ✅ Serves static frontend files
- ✅ Handles React Router SPA routing

---

## 🧪 Testing Locally Before Deployment

```bash
# Test the build process locally
cd client
npm install
npm run build

# Should create dist/ folder
ls dist

# Test the complete build
cd ..
npm run build
```

---

## ✅ What Gets Deployed

### Frontend
- React app built by Vite → `client/dist/`
- Served as static files
- Includes all pages, components, and assets

### Backend
- Express API server
- Serverless function on Vercel
- Connects to MongoDB Atlas

### Database
- MongoDB Atlas (no changes needed)
- Just ensure IP whitelist includes Vercel

---

## 🚀 After Deployment

Once deployed on Vercel:

1. **Get your URL:**
   ```
   https://your-project-name.vercel.app
   ```

2. **Update Environment Variables if needed:**
   - Go to project settings → Environment Variables
   - Add/update any missing variables

3. **Test the deployment:**
   - Open your Vercel URL
   - Check campaigns page
   - Try making a donation
   - View dashboard

---

## 🐛 Troubleshooting

### Build fails with "vite: command not found"
**Solution:** Ensure client `npm install` runs before build
- ✅ Already fixed in `vercel.json`

### MongoDB connection fails
**Solution:** Add Vercel IP to MongoDB whitelist
1. Go to MongoDB Atlas Dashboard
2. Network Access → IP Whitelist
3. Add: `0.0.0.0/0` (allows all IPs)
4. Or: Add Vercel's IP ranges

### CORS errors after deployment
**Solution:** Update backend CORS settings
```javascript
// In server.js
app.use(cors({
  origin: 'https://your-domain.vercel.app',
  credentials: true
}));
```

### Environmental variables not loading
**Solution:** Restart deployment
1. Go to Vercel Dashboard
2. Select your project
3. Deployments → Latest
4. Click "Redeploy"

---

## 📊 Build Size Optimization Tips

✅ **Already configured:**
- Vite minification enabled
- Tree shaking enabled
- Code splitting enabled

✅ **Frontend optimizations:**
- Dark theme CSS only loaded when needed
- Framer Motion lazy loaded
- Lucide icons tree-shaken

✅ **What you can do:**
- Run `npm run build` and check `client/dist` size
- Use `npm run preview` to test production build locally

---

## 🎯 Next Steps

1. **Push changes to GitHub:**
   ```bash
   git add .
   git commit -m "Add Vercel deployment configuration"
   git push origin main
   ```

2. **Go to Vercel.com** and connect your repository

3. **Add environment variables** in Vercel project settings

4. **Deploy!** 🚀

---

## ✨ Success Indicators

After deployment, you should see:
- ✅ Green checkmark on Vercel deployment
- ✅ Website accessible at vercel.app domain
- ✅ All pages loading
- ✅ API calls working
- ✅ Database connected
- ✅ Authentication working
- ✅ Donations recording properly

---

**Status:** Ready for deployment! 🎉

