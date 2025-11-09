# HelpingHands - Online Donation System

A full-stack MERN (MongoDB, Express, React, Node.js) web application for connecting people in need with willing donors. The platform allows users to register, create donation posts, and contribute to causes they care about.

## 🌟 Features

### Core Features ✅
- **User Authentication**: Secure signup, login, and password reset with JWT
- **Donation Posts**: Users can create and manage donation requests
- **Donation System**: Donors can contribute to causes
- **User Dashboard**: View personal posts, donations, and profile
- **Search & Filter**: Find donation posts by category and location
- **Responsive Design**: Mobile-friendly UI

### Social Media-Style Campaigns (NEW!) 🎉
- **Campaign Marketplace**: Browse beautiful social media-style donation campaigns
- **Advanced Filters**: Search, filter by category, and status
- **Create Campaigns**: Users can launch fundraising campaigns with images
- **Real-time Progress**: Visual progress bars showing funding percentage
- **Like & Engage**: Like campaigns and see community support
- **Donate Flow**: Streamlined donation experience with multiple payment methods
- **Top Charities**: Showcase featured organizations
- **Animations**: Smooth Framer Motion animations throughout

### Extra Features
- **Admin Dashboard**: Manage users, posts, campaigns, and donations
- **Donation Progress Tracking**: Visual progress bars for donation goals
- **Email Notifications**: Automated emails when donations are received
- **Contact Form**: Send messages to administrators
- **Statistics Dashboard**: View platform statistics
- **Image Uploads**: Upload images for donation posts
- **Dark Mode**: Switch between light and dark themes
- **Comment System**: Add comments to campaigns

## 📋 Tech Stack

### Frontend
- **React.js** (with Vite)
- **React Router DOM** (routing)
- **Axios** (API calls)
- **Tailwind CSS** (styling)
- **Framer Motion** (smooth animations)
- **Lucide React** (beautiful icons)
- **Context API** (state management)

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose)
- **JWT** (authentication)
- **Bcrypt** (password hashing)
- **Multer** (file uploads)
- **Nodemailer** (email notifications)
- **CORS** (cross-origin requests)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HelpingHands
   ```

2. **Install dependencies for both client and server**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Configure environment variables**

   **Server (.env)**
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/helpinghands
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   SENDER_EMAIL=your_email@gmail.com
   SENDER_PASSWORD=your_app_password
   ADMIN_EMAIL=admin@helpinghands.com
   ```

   **Client (.env)**
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Project

**Option 1: Run servers separately**

Terminal 1 (Backend):
```bash
cd server
npm start
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

**Option 2: Run both concurrently**
```bash
npm install -g concurrently
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173` (Vite dev server)
- Backend: `http://localhost:5000`

## 📁 Project Structure

```
HelpingHands/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── context/          # Context API
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # API services
│   │   ├── utils/            # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/               # Static files
│   └── package.json
│
├── server/                    # Express backend
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Custom middleware
│   ├── config/               # Configuration files
│   ├── utils/                # Utility functions
│   ├── server.js             # Entry point
│   └── package.json
│
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password

### Posts (Donations)
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (authenticated)
- `PUT /api/posts/:id` - Update post (authenticated)
- `DELETE /api/posts/:id` - Delete post (authenticated)

### Donations
- `GET /api/donations` - Get all donations
- `POST /api/donations` - Create donation (authenticated)
- `GET /api/donations/user/:userId` - Get user donations

### Contact
- `POST /api/contact` - Send contact message

### Admin
- `GET /api/admin/stats` - Get platform statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/posts` - Get all posts
- `DELETE /api/admin/users/:id` - Delete user
- `DELETE /api/admin/posts/:id` - Delete post

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📧 Email Notifications

When a donation is received, an automated email is sent to the post creator using Nodemailer. Configure your email credentials in the `.env` file.

## 🗄️ Database Models

### User
- name, email, password (hashed), role (donor/receiver), createdAt

### Post
- title, description, image, requiredAmount, collectedAmount, createdBy, category, location, createdAt

### Donation
- donorId, postId, amount, date

### Message
- name, email, message, createdAt

## 🧪 Testing

To test the application, use the seed data provided in `server/seeds/seedData.js`:

```bash
cd server
npm run seed
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please contact: support@helpinghands.com

---

**Happy Coding! 🚀**
