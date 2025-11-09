# 🚀 HelpingHands - Installation & Running Guide

## Copy & Paste Commands

### Step 1: Navigate to Project
```bash
cd "d:\Projects\New folder (2)"
```

### Step 2: Install All Dependencies
```bash
npm run install-all
```
This installs:
- Root dependencies
- Server dependencies
- Client dependencies

### Step 3: Configure Environment

**Edit `server\.env`:**
```
PORT=5000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/helpinghands?retryWrites=true&w=majority
JWT_SECRET=any_random_string_12345
SENDER_EMAIL=your_email@gmail.com
SENDER_PASSWORD=your_gmail_app_password
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@helpinghands.com
```

**Edit `client\.env`:**
```
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Optional - Seed Database
```bash
cd server
npm run seed
cd ..
```

### Step 5: Start Development Servers
```bash
npm run dev
```

---

## 🌐 Access Points

After running `npm run dev`, open:

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

---

## 📝 Available Commands

### From Root Directory
```bash
# Install all dependencies
npm run install-all

# Start both servers
npm run dev

# Start backend only
npm run server

# Start frontend only
npm run client

# Build frontend for production
npm run build
```

### From Server Directory
```bash
cd server

# Start backend
npm start

# Start with auto-reload
npm run dev

# Seed database with test data
npm run seed
```

### From Client Directory
```bash
cd client

# Start frontend dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🧪 Test the Application

### 1. Test User Registration
```bash
# Signup page will be at:
http://localhost:5173/signup

# Choose role: Donor or Receiver
```

### 2. Test with Seed Data (if seeded)
```
Donor Login:
  Email: donor@example.com
  Password: password123

Receiver Login:
  Email: receiver@example.com
  Password: password123

Admin Login:
  Email: admin@example.com
  Password: password123
```

### 3. Test Features
1. **Browse Causes:** http://localhost:5173/charities
2. **Create Post:** http://localhost:5173/create-post (login first)
3. **Make Donation:** Click on a cause and donate
4. **Dashboard:** http://localhost:5173/dashboard
5. **Admin Panel:** http://localhost:5173/admin

---

## 🔧 Configuration Details

### MongoDB Setup

1. Visit https://www.mongodb.com/cloud/atlas
2. Create account (free tier available)
3. Create cluster
4. Go to Database → Collections → Connect
5. Copy connection string
6. Replace in `server\.env`:
   ```
   MONGODB_URI=your_connection_string_here
   ```

### Gmail Setup (for emails)

1. Go to https://myaccount.google.com/apppasswords
2. Make sure 2-Factor Authentication is enabled
3. Select "Mail" and "Windows Computer"
4. Generate password
5. Copy and paste into `server\.env`:
   ```
   SENDER_EMAIL=your_gmail@gmail.com
   SENDER_PASSWORD=generated_app_password
   ```

---

## ⚠️ Troubleshooting Commands

### Port Already in Use
```bash
# Change PORT in server\.env to different port
PORT=5001
```

### Clear and Reinstall
```bash
# Delete node_modules
rm -r node_modules client/node_modules server/node_modules

# Reinstall
npm run install-all
```

### Reset Database
```bash
# In MongoDB Atlas, delete the database
# Then reseed:
cd server
npm run seed
cd ..
```

### View Logs
```bash
# Terminal will show both server and frontend logs
# Look for errors
```

---

## 📊 Environment Variables Checklist

### Server (.env)
- [ ] MONGODB_URI - Your MongoDB connection string
- [ ] JWT_SECRET - Any random string for signing tokens
- [ ] SENDER_EMAIL - Your Gmail address
- [ ] SENDER_PASSWORD - Gmail app password
- [ ] PORT - Set to 5000 (default)
- [ ] FRONTEND_URL - Set to http://localhost:5173
- [ ] ADMIN_EMAIL - Admin email address

### Client (.env)
- [ ] VITE_API_URL - Set to http://localhost:5000/api

---

## ✅ Verification Steps

After setup, verify:

1. **Backend Running**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Should return: `{"message":"Server is running"}`

2. **Frontend Accessible**
   - Open http://localhost:5173 in browser
   - Should see HelpingHands homepage

3. **Database Connected**
   - Backend terminal should show MongoDB connection message
   - No connection errors

4. **Can Create Account**
   - Go to /signup
   - Fill form and submit
   - Should create account and redirect to home

---

## 🎯 Testing Workflows

### Workflow 1: Donor Donating
```
1. Go to http://localhost:5173/signup
2. Create Donor account
3. Go to /charities
4. Click on a cause
5. Enter donation amount
6. Click "Donate Now"
7. Should see success message
```

### Workflow 2: Receiver Creating Cause
```
1. Go to http://localhost:5173/signup
2. Create Receiver account
3. Go to /create-post
4. Fill in cause details
5. Upload image
6. Submit
7. Should redirect to dashboard
```

### Workflow 3: Admin Managing
```
1. Use admin@example.com (if seeded)
2. Go to /admin
3. View statistics
4. Manage users, posts, donations
5. Delete content as needed
```

---

## 📱 Test Endpoints with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "donor"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get All Posts
```bash
curl http://localhost:5000/api/posts
```

---

## 🔄 Normal Workflow After Setup

**Every Time You Want to Code:**

```bash
# 1. Navigate to project
cd "d:\Projects\New folder (2)"

# 2. Start development servers
npm run dev

# 3. Open http://localhost:5173 in browser

# 4. Start coding!
```

---

## 🛑 Stopping Servers

```bash
# Press Ctrl+C in terminal where npm run dev is running
# This stops both frontend and backend
```

---

## 🎉 First Run Checklist

- [ ] MongoDB Atlas account created
- [ ] MongoDB connection string copied
- [ ] Gmail app password generated
- [ ] server\.env configured
- [ ] client\.env configured (optional, already set)
- [ ] npm run install-all completed
- [ ] npm run seed completed (optional)
- [ ] npm run dev started successfully
- [ ] Frontend loads at http://localhost:5173
- [ ] Backend health check works
- [ ] Can create account
- [ ] Can login
- [ ] Can browse causes

---

## 📚 File Locations

```
d:\Projects\New folder (2)\
├── server\
│   ├── .env              ← EDIT THIS
│   └── server.js         ← Main backend
├── client\
│   ├── .env              ← EDIT THIS (optional)
│   └── src\App.jsx       ← Main frontend
├── QUICK_START.md        ← Quick reference
└── SETUP_GUIDE.md        ← Detailed guide
```

---

## 🎯 Next: Customize & Deploy

### Customize
1. Edit colors in `client/tailwind.config.js`
2. Change logo in `client/src/components/Navbar.jsx`
3. Modify email templates in `server/utils/emailService.js`

### Deploy
1. Backend: Heroku, Railway, or Render
2. Frontend: Vercel or Netlify
3. Database: MongoDB Atlas (already set up)

---

## 💡 Pro Tips

1. **Check console for errors** - F12 in browser
2. **Check terminal for server errors** - See both frontend and backend logs
3. **Use Postman** - Test API endpoints
4. **Monitor MongoDB** - Check Atlas dashboard
5. **Email test** - Make donation to test notifications

---

## 🆘 Quick Help

**Can't connect to MongoDB?**
→ Check connection string in `server\.env`
→ Verify credentials
→ Ensure MongoDB Atlas cluster is running

**Emails not sending?**
→ Check Gmail 2FA enabled
→ Verify app password in `server\.env`
→ Check email address

**Port 5000 in use?**
→ Change `PORT=5000` to `PORT=5001` in `server\.env`

**Frontend won't load?**
→ Check frontend is running
→ Check http://localhost:5173
→ Clear browser cache

---

## 🚀 You're Ready!

### Quick Summary

```bash
# 1. Install
npm run install-all

# 2. Configure
# Edit server\.env with MongoDB URI and Gmail password

# 3. Seed (optional)
cd server && npm run seed && cd ..

# 4. Run
npm run dev

# 5. Visit
# http://localhost:5173
```

---

**That's it! Your HelpingHands platform is running!** 🎉

---

*Last Updated: October 17, 2024*
