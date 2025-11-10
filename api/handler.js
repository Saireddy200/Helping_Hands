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
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../server/uploads')));

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/campaigns', campaignRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// For Vercel serverless
module.exports = app;
