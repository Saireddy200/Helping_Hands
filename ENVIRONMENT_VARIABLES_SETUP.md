# 🔐 Setting Up Environment Variables on Vercel

## ❌ Error Message
```
Environment Variable "MONGODB_URI" references Secret "MONGODB_URI", which does not exist.
```

---

## ✅ Solution: Add Environment Variables to Vercel

### **Step 1: Go to Your Vercel Project Dashboard**
1. Visit: https://vercel.com/dashboard
2. Click on your project: **Helping_Hands** (or your project name)

### **Step 2: Go to Settings**
- Click **Settings** in the top menu

### **Step 3: Go to Environment Variables**
- Left sidebar → **Environment Variables**
- Or directly: Settings → Environment Variables

### **Step 4: Add MONGODB_URI**

Click **"Add New"** and fill in:

**Name:** `MONGODB_URI`

**Value:** Your MongoDB connection string

**Example:**
```
mongodb+srv://username:password@cluster.mongodb.net/helpinghands?retryWrites=true&w=majority
```

**Environment:** Select all (or Development, Preview, Production)

Click **Save**

---

### **Step 5: Add JWT_SECRET**

Click **"Add New"** again:

**Name:** `JWT_SECRET`

**Value:** A random secure string (can be anything complex)

**Example:**
```
your_super_secret_jwt_key_12345_abcdef_xyz_random_string
```

**Environment:** Select all

Click **Save**

---

### **Step 6: Add NODE_ENV (Optional but Recommended)**

Click **"Add New"**:

**Name:** `NODE_ENV`

**Value:** `production`

**Environment:** Production only

Click **Save**

---

## 🔍 Where to Get Your MONGODB_URI

### If You Have MongoDB Atlas:

1. Go to: https://cloud.mongodb.com/
2. Sign in to your account
3. Click on your **Cluster**
4. Click **"Connect"** button
5. Choose **"Drivers"** or **"Connect your application"**
6. Copy the connection string
7. Replace `<password>` with your actual database password
8. Replace `<dbname>` with `helpinghands`

**Should look like:**
```
mongodb+srv://saisrinureddy809:YourPassword@cluster0.yn0xsqs.mongodb.net/helpinghands?retryWrites=true&w=majority
```

---

## 🚨 Important: IP Whitelist

**Before deploying**, add Vercel's IP to MongoDB:

1. MongoDB Atlas Dashboard
2. **Network Access** → **IP Whitelist**
3. Click **"Add IP Address"**
4. Enter: `0.0.0.0/0` (allows all IPs)
   - OR: Add specific Vercel IPs
5. Click **"Confirm"**

---

## ✅ Complete Environment Variables List

Add these to Vercel:

| Name | Value | Example |
|------|-------|---------|
| `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/helpinghands?retryWrites=true&w=majority` |
| `JWT_SECRET` | Any random secure string | `my_super_secret_key_12345_xyz` |
| `NODE_ENV` | `production` | `production` |

---

## 🔄 After Adding Variables

1. Go to **Deployments** tab
2. Find your latest deployment
3. Click the **"..."** menu
4. Click **"Redeploy"**
5. Vercel will rebuild with new environment variables

---

## ✨ Verification

After redeploying, check if:
- ✅ Build succeeds (no more "vite: command not found")
- ✅ Database connects (check MongoDB logs)
- ✅ Site loads at your Vercel domain
- ✅ API calls work
- ✅ Campaigns display
- ✅ Donations can be made

---

## 🐛 Troubleshooting

### Still getting error?
1. Clear Vercel cache: Go to Settings → Deployments → Clear cache
2. Redeploy
3. Check MongoDB connection string for typos

### Database not connecting?
1. Verify `MONGODB_URI` is correct
2. Check MongoDB IP whitelist
3. Ensure database name exists (should be `helpinghands`)

### Can't find MongoDB Atlas?
1. Go to: https://cloud.mongodb.com
2. Sign in with your credentials
3. Look for your cluster in the Clusters tab

---

## 📸 Quick Reference

Your Vercel Environment Variables should look like:
```
MONGODB_URI: mongodb+srv://...
JWT_SECRET: your_secret_here
NODE_ENV: production
```

---

**Status:** Follow steps above to add environment variables
**Next:** Redeploy and your site should work! ✅

