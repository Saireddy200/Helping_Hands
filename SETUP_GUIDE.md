# HelpingHands - MERN Stack Setup Guide

## 🎯 Quick Start

### Prerequisites
- Node.js v14+ and npm
- MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)
- Git
- A Gmail account (for email notifications)

---

## 📦 Installation Steps

### Step 1: Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install all dependencies (server + client)
npm run install-all
```

### Step 2: Configure Environment Variables

#### Server Configuration (server/.env)

1. **MongoDB Setup**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free account
   - Create a cluster
   - Get your connection string
   - Replace `MONGODB_URI` with your connection string

2. **Gmail Setup (for email notifications)**
   - Go to https://myaccount.google.com/apppasswords
   - Enable 2-Factor Authentication first
   - Generate an App Password
   - Use the generated password for `SENDER_PASSWORD`

3. **Edit server/.env**
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/helpinghands
   JWT_SECRET=your_random_secret_key_here
   SENDER_EMAIL=your_email@gmail.com
   SENDER_PASSWORD=your_app_password
   FRONTEND_URL=http://localhost:5173
   ADMIN_EMAIL=admin@helpinghands.com
   ```

#### Client Configuration (client/.env)

Already configured to use the backend at `http://localhost:5000/api`

---

## 🚀 Running the Application

### Option 1: Run Both Servers Concurrently (Recommended)

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend**: http://localhost:5000 (Express server)

### Option 2: Run Separately in Different Terminals

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

---

## 🌱 Seed the Database

To populate the database with test data:

```bash
cd server
npm run seed
```

This creates:
- 5 test users
- 5 sample donation posts
- 5 sample donations

**Test Credentials:**
- Email: `donor@example.com` | Password: `password123`
- Email: `receiver@example.com` | Password: `password123`
- Email: `admin@example.com` | Password: `password123` (Admin access)

---

## 📋 API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password` - Reset password
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Posts/Causes
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (multipart/form-data with image)
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `GET /api/posts/user/my-posts` - Get user's posts

### Donations
- `GET /api/donations` - Get all donations
- `POST /api/donations` - Create donation
- `GET /api/donations/user/:userId` - Get user's donations
- `GET /api/donations/post/:postId` - Get donations for a post
- `GET /api/donations/stats/all` - Get donation statistics

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all messages (admin only)
- `GET /api/contact/:id` - Get single message (admin only)
- `PUT /api/contact/:id` - Update message status (admin only)
- `DELETE /api/contact/:id` - Delete message (admin only)

### Admin
- `GET /api/admin/stats` - Get platform statistics
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/posts` - Get all posts
- `DELETE /api/admin/posts/:id` - Delete post
- `GET /api/admin/donations` - Get all donations

---

## 🔐 Authentication

The app uses JWT (JSON Web Tokens) for authentication:

1. User logs in → Backend generates JWT
2. JWT is stored in localStorage on the client
3. JWT is sent with each request in the Authorization header: `Bearer <token>`

Protected routes require authentication and check the token.

---

## 📁 Project Structure

```
HelpingHands/
├── server/                    # Express.js Backend
│   ├── models/               # Mongoose schemas
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Donation.js
│   │   └── Message.js
│   ├── routes/               # API routes
│   ├── controllers/          # Business logic
│   ├── middleware/           # Auth, upload, etc
│   ├── utils/                # Email, tokens
│   ├── config/               # Database config
│   ├── seeds/                # Test data
│   ├── uploads/              # Uploaded images
│   ├── server.js             # Entry point
│   ├── package.json
│   └── .env                  # Environment variables
│
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── DonationCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── CharitiesPage.jsx
│   │   │   ├── CreatePostPage.jsx
│   │   │   ├── PostDetailPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── AdminDashboardPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   └── ForgotPasswordPage.jsx
│   │   ├── context/          # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── services/         # API calls
│   │   │   ├── api.js
│   │   │   └── index.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env
│
├── package.json              # Root package.json
├── README.md
└── .gitignore
```

---

## ✨ Features Implemented

### Core Features
✅ User authentication (signup, login, forgot password)
✅ Create and manage donation posts
✅ Donate to causes
✅ User dashboard with posts and donations
✅ Search and filter causes
✅ Responsive design

### Extra Features
✅ Admin dashboard for managing users, posts, donations
✅ Donation progress tracking with progress bars
✅ Email notifications (Nodemailer)
✅ Contact form
✅ Platform statistics
✅ Image uploads for posts
✅ User profile management
✅ JWT authentication
✅ Password hashing with bcrypt

---

## 🧪 Testing the Application

### 1. Register a New User
- Go to `/signup`
- Fill in name, email, password
- Choose role: Donor or Receiver

### 2. Create a Donation Post
- Login as a Receiver
- Click "Create Post"
- Fill in title, description, amount, category, location
- Upload an image

### 3. Make a Donation
- Login as a Donor
- Go to `/charities`
- Click on a cause
- Enter donation amount and submit

### 4. Admin Dashboard
- Login as admin (admin@example.com)
- Go to `/admin`
- View and manage users, posts, donations

### 5. Test Email Notifications
- When a donation is made, check if email is received
- Configure Gmail app password if not working

---

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB URI is correct
- Ensure MongoDB Atlas cluster is running
- Check if port 5000 is available

### Frontend won't start
- Delete `node_modules` in client folder
- Run `npm install` again
- Check if port 5173 is available

### Email not sending
- Enable 2FA on Gmail
- Generate app password and update .env
- Check SENDER_EMAIL and SENDER_PASSWORD in .env

### CORS errors
- Ensure backend is running on http://localhost:5000
- Check VITE_API_URL in client/.env

### Images not uploading
- Check server/uploads directory exists
- Ensure Multer is properly configured
- Check file size limits

---

## 📚 Technologies Used

**Frontend:**
- React 18
- Vite
- React Router DOM 6
- Axios
- Tailwind CSS
- Context API

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Multer
- Nodemailer

---

## 📝 License

MIT License

---

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API endpoints
3. Check environment variables
4. Verify MongoDB connection

---

## 🚀 Deployment

### Deploy Backend (Heroku, Railway, Render)
1. Push code to GitHub
2. Connect to deployment platform
3. Set environment variables
4. Deploy

### Deploy Frontend (Vercel, Netlify)
1. Build: `npm run build`
2. Deploy the `dist` folder
3. Update API URL in `.env`

---

**Happy coding! 🎉**
