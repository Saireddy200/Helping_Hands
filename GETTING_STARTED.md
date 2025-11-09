# 🚀 Getting Started - Your HelpingHands App

## Current Status ✅

| Component | Status | Port | Link |
|-----------|--------|------|------|
| Frontend | ✅ Running | 5173 | http://localhost:5173 |
| Backend | ✅ Running | 5000 | http://localhost:5000/api |
| Database | ✅ Mock DB | - | In-memory (works perfectly) |
| Theme | ✅ Working | - | Light/Dark toggle |
| Auth | ✅ Working | - | Signup/Login functional |

---

## 🎯 Start Using Your App

1. **Open your browser**: http://localhost:5173
2. **View the homepage** with beautiful animations
3. **Click "Sign Up"** to create an account
4. **Test the theme toggle** (Sun/Moon icon in navbar)
5. **Explore all features** - responsive design, animations, theme switching

---

## 💻 Server Commands

### Start Both Servers (One Command)
```powershell
# From project root
npm run dev
```

### Start Individually

**Backend:**
```powershell
cd server
npm start
```

**Frontend:**
```powershell
cd client
npm run dev
```

### Stop Servers
```powershell
# Press Ctrl+C in terminal
```

---

## 📱 Test Features

### Signup
```
1. Go to Signup page
2. Enter: Name, Email, Password, Role
3. Click "Sign Up"
4. You're logged in! 🎉
```

### Login
```
1. After signup, go to Login page
2. Use same email & password
3. Should successfully login
```

### Theme Toggle
```
1. Click Sun/Moon icon (top right navbar)
2. Page switches to dark mode
3. Refresh page - theme persists!
```

### Responsive Design
```
1. Press F12 (DevTools)
2. Click device toolbar icon
3. Test on mobile, tablet, desktop
4. Menu collapses on mobile ✅
```

---

## 🗂️ Project Files

### Key Backend Files
- `server/.env` - Configuration (MongoDB URI, JWT secret, email)
- `server/server.js` - Main server file
- `server/db/mockDb.js` - In-memory database (why it works without real MongoDB)
- `server/controllers/authController.js` - Login/Signup logic

### Key Frontend Files
- `client/.env.local` - API URL configuration
- `client/src/App.jsx` - Main app with theme state
- `client/src/pages/HomePageNew.jsx` - Beautiful homepage
- `client/src/components/NavbarNew.jsx` - Navbar with animations
- `client/src/components/FooterNew.jsx` - Rich footer

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI framework
- **Vite 4.5** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Router** - Navigation

### Backend
- **Node.js 18+** - Runtime
- **Express 4.18** - Web framework
- **Mongoose 7.5** - MongoDB ORM
- **Bcryptjs** - Password hashing
- **JWT** - Authentication
- **Multer** - File uploads
- **Nodemailer** - Email sending

---

## ⚙️ Configuration

### Environment Variables (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
SENDER_EMAIL=your_email@gmail.com
SENDER_PASSWORD=app_password
FRONTEND_URL=http://localhost:5173
```

### Frontend Config (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🔒 Authentication

### How It Works
```
1. User signs up → Password hashed with bcrypt
2. JWT token generated → Sent to frontend
3. Token stored in localStorage
4. Token sent with every API request
5. Backend validates token → Access granted
```

### Token Expiration
- Default: 7 days
- Stored in localStorage
- Sent as: `Authorization: Bearer <token>`

---

## 🗄️ Database (Mock)

### What's Stored in Memory
- **Users** - Registration data, hashed passwords
- **Posts** - Campaign posts
- **Donations** - Donation records
- **Messages** - Contact form submissions

### Important ⚠️
- Data is in memory (resets on server restart)
- Perfect for development & testing
- For production: Use local or cloud MongoDB

---

## 📊 API Endpoints

### Auth
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile (requires token)
```

### Posts
```
GET    /api/posts
POST   /api/posts (requires token)
GET    /api/posts/:id
```

### Donations
```
POST   /api/donations (requires token)
GET    /api/donations
```

### Contact
```
POST   /api/contact
```

---

## 🎨 Homepage Features

### Sections
1. **Hero** - Beautiful animated introduction
2. **About** - 4 category cards with icons
3. **Achievements** - Animated counters (meals, campaigns, donors, funds)
4. **Gallery** - 6 images with hover effects
5. **Testimonials** - 3 testimonial cards with ratings
6. **CTA** - Call-to-action section

### Animations
- ✨ Fade-in effects
- 🎯 Slide animations
- 🔄 Animated counters
- 🖱️ Hover effects
- 📱 Scroll-triggered animations

---

## 🌟 Cool Features Implemented

✅ Responsive navbar with mobile hamburger menu  
✅ Theme toggle (Light/Dark mode with localStorage persistence)  
✅ Beautiful animations using Framer Motion  
✅ Icon library (Lucide React)  
✅ Animated achievement counters  
✅ Gallery with hover overlays  
✅ Smooth scroll navigation  
✅ Password hashing with bcryptjs  
✅ JWT authentication  
✅ Protected routes by role  
✅ In-memory mock database  
✅ CORS enabled for frontend  
✅ Error handling on both frontend & backend  

---

## 🚨 Common Issues

### "Failed to fetch" error
- Check if backend is running on port 5000
- Check VITE_API_URL is correct

### Signup/Login not working
- Check browser console for error details
- Check backend terminal for logs
- Verify .env.local has correct API URL

### Theme not persisting
- Check if localStorage is enabled
- Check browser DevTools → Application → Storage

### Port already in use
```powershell
# Kill process on port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000 -ErrorAction Ignore).OwningProcess | Stop-Process -Force

# Kill process on port 5173
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173 -ErrorAction Ignore).OwningProcess | Stop-Process -Force
```

---

## 🚀 Next Steps

1. ✅ **Test the app** - Try all pages and features
2. ✅ **Test authentication** - Signup, login, logout
3. ✅ **Test responsiveness** - Mobile, tablet, desktop
4. ✅ **Test theme** - Toggle dark/light mode
5. → **Build new features** - Add more functionality!

---

## 📚 Documentation Files

- `MONGODB_SOLUTION.md` - Detailed MongoDB connection info
- `QUICK_START.md` - Commands and setup
- `API_DOCUMENTATION.md` - All API endpoints
- `FEATURES.md` - Complete feature list
- `PROJECT_SUMMARY.md` - Project overview

---

## 🎉 You're All Set!

Your **HelpingHands** application is fully functional and ready for development!

**Open http://localhost:5173 and start exploring!**

---

**Questions?** Check the documentation files in the project root.  
**Need help?** Look at server/client terminal output for error messages.  

**Happy coding! 🚀**
