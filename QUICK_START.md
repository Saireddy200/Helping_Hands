# 🚀 HelpingHands - Quick Start Guide

## Start Here! 👇

### 5-Minute Setup

#### Step 1: Prerequisites Check ✅
- [ ] Node.js installed (v14+): `node --version`
- [ ] npm installed: `npm --version`
- [ ] MongoDB Atlas account created (free at https://www.mongodb.com/cloud/atlas)
- [ ] Gmail account ready (for email notifications)

#### Step 2: Clone & Install
```bash
cd "d:\Projects\New folder (2)"
npm run install-all
```

#### Step 3: Get Your MongoDB Connection String
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign in to your account
3. Go to Databases → Connect → Connect your application
4. Copy the connection string
5. Replace `<username>` and `<password>` with your credentials

#### Step 4: Configure Environment Variables

**server/.env** - Replace these values:
```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/helpinghands?retryWrites=true&w=majority
JWT_SECRET=any_random_string_here_12345
SENDER_EMAIL=your_email@gmail.com
SENDER_PASSWORD=your_app_password
```

**For Gmail App Password:**
1. Go to https://myaccount.google.com/apppasswords
2. Make sure 2-factor authentication is enabled
3. Select Mail and Windows Computer
4. Copy the generated password
5. Paste it as SENDER_PASSWORD

#### Step 5: Optional - Seed Database
```bash
cd server
npm run seed
cd ..
```

This creates test data with 5 users and 5 sample posts.

#### Step 6: Start Development Servers

**⭐ For Windows (Recommended - Memory Fix Included):**

**Option A - Double-click to run (Easiest):**
```
run-dev.bat
```

**Option B - PowerShell:**
```powershell
.\run-dev.ps1
```

**Option C - Manual:**
```powershell
$env:NODE_OPTIONS = "--max-old-space-size=4096"; npm run dev
```

**Linux/Mac:**
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run dev
```

**Open in Browser:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

> 💡 If you see memory errors, read [FIX_MEMORY_ISSUE.md](FIX_MEMORY_ISSUE.md)

---

## 🎮 Test the Application

### Scenario 1: Register as a Donor
1. Go to http://localhost:5173/signup
2. Fill in details and select "Donor (Help Others)"
3. Click Sign Up

### Scenario 2: Browse Causes
1. Click "Charities" in navbar
2. Browse through available causes
3. Use filters to search by category or location

### Scenario 3: Create a Cause (as Receiver)
1. Go to http://localhost:5173/signup
2. Select "Receiver (Ask for Help)"
3. Sign up and go to "Create Post"
4. Fill in cause details with image
5. Submit

### Scenario 4: Make a Donation
1. Login as donor
2. Go to Charities
3. Click on a cause
4. Enter donation amount
5. Click "Donate Now"

### Scenario 5: View Admin Dashboard
**Use seed account:**
- Email: `admin@example.com`
- Password: `password123`
- Go to http://localhost:5173/admin

---

## 📋 Important Files

### Backend
- `server/server.js` - Main server file
- `server/.env` - Environment configuration (YOU NEED TO EDIT THIS)
- `server/models/` - Database schemas
- `server/routes/` - API endpoints
- `server/controllers/` - Business logic

### Frontend
- `client/src/App.jsx` - Main component
- `client/.env` - Frontend configuration
- `client/src/pages/` - All pages
- `client/src/components/` - Reusable components
- `client/src/services/` - API calls

### Documentation
- `README.md` - Main overview
- `SETUP_GUIDE.md` - Detailed setup
- `API_DOCUMENTATION.md` - All API endpoints
- `DEVELOPMENT_CHECKLIST.md` - Features list
- `PROJECT_SUMMARY.md` - What's included

---

## ⚠️ Common Issues & Fixes

### Issue: "MongoNetworkError"
**Solution:** 
- Check MongoDB URI in .env
- Verify credentials are correct
- Check MongoDB Atlas cluster is running

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Change PORT in server/.env to 5001
PORT=5001
```

### Issue: Email not sending
**Solution:**
- Check Gmail 2FA is enabled
- Generate new app password
- Update SENDER_EMAIL and SENDER_PASSWORD in .env

### Issue: Images not uploading
**Solution:**
- Create `server/uploads` directory (should be created automatically)
- Check file size is under 5MB
- Verify file format is JPG/PNG/GIF/WebP

### Issue: CORS errors
**Solution:**
- Ensure backend is running on port 5000
- Check `VITE_API_URL=http://localhost:5000/api` in client/.env

---

## 🧪 Test with Seed Data

After running `npm run seed`, use these accounts:

**Donor Account:**
```
Email: donor@example.com
Password: password123
Role: Donor
```

**Receiver Account:**
```
Email: receiver@example.com
Password: password123
Role: Receiver
```

**Admin Account:**
```
Email: admin@example.com
Password: admin123
Role: Admin
```

---

## 📱 Feature Checklist

### User Can:
- [ ] Register as Donor or Receiver
- [ ] Login and logout
- [ ] View all donation causes
- [ ] Search and filter causes
- [ ] View cause details
- [ ] Make donations
- [ ] Create donation posts (if Receiver)
- [ ] Edit/delete own posts
- [ ] View personal dashboard
- [ ] Update profile
- [ ] Send contact messages
- [ ] Reset password

### Admin Can:
- [ ] View all platform statistics
- [ ] Manage users (view/delete)
- [ ] Manage posts (view/delete)
- [ ] View all donations
- [ ] Manage contact messages

---

## 🎯 Key Endpoints to Test

### Try These in Browser or Postman:

**Health Check:**
```
GET http://localhost:5000/api/health
```

**Get All Posts:**
```
GET http://localhost:5000/api/posts
```

**Get Statistics:**
```
GET http://localhost:5000/api/donations/stats/all
```

---

## 📚 Next Steps

1. **Understand the Codebase**
   - Review `client/src/App.jsx` for routing
   - Check `server/server.js` for API setup
   - Look at `AuthContext.jsx` for state management

2. **Customize**
   - Change logo/brand in Navbar.jsx
   - Modify colors in tailwind.config.js
   - Update email templates in emailService.js

3. **Add Features**
   - Stripe/PayPal integration
   - Notifications system
   - Advanced analytics
   - Social media sharing

4. **Deploy**
   - Backend: Heroku, Railway, Render
   - Frontend: Vercel, Netlify
   - Database: MongoDB Atlas (already set up)

---

## 💡 Pro Tips

- Check browser console (F12) for frontend errors
- Check terminal for backend errors
- Use Postman to test API endpoints
- Monitor MongoDB Atlas dashboard for data
- Check Gmail for email notifications

---

## 🆘 Help & Support

**Need Help?**
1. Check SETUP_GUIDE.md for detailed instructions
2. Review API_DOCUMENTATION.md for endpoint details
3. Check PROJECT_SUMMARY.md for what's included
4. Look at error messages in terminal/console

**Common Commands:**
```bash
# Start everything
npm run dev

# Start backend only
npm run server

# Start frontend only
npm run client

# Seed database
cd server && npm run seed

# Install all dependencies fresh
npm run install-all
```

---

## ✅ You're All Set!

Your HelpingHands application is ready to run!

```bash
npm run dev
```

**Access:**
- 🌐 Frontend: http://localhost:5173
- 🔌 Backend: http://localhost:5000
- 📚 API: http://localhost:5000/api

---

**Happy Coding! 🚀**

Need more help? Check the documentation files in the root directory!
