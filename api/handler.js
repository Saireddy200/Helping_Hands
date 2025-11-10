require('dotenv').config();

// IMPORTANT: This allows MongoDB Atlas to work on Windows by disabling SSL certificate verification
// In production, use proper SSL certificates instead
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('../server/config/db');

// Import routes
const authRoutes = require('../server/routes/authRoutes');
const postRoutes = require('../server/routes/postRoutes');
const donationRoutes = require('../server/routes/donationRoutes');
const contactRoutes = require('../server/routes/contactRoutes');
const adminRoutes = require('../server/routes/adminRoutes');
const campaignRoutes = require('../server/routes/campaignRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../server/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/campaigns', campaignRoutes);

// Connect to DB
connectDB();

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
