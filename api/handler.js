require('dotenv').config();

// Allow MongoDB connection on Vercel
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB connection with caching
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable not set');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority',
      authSource: 'admin',
    });

    isConnected = true;
    console.log('✅ MongoDB Connected:', conn.connection.name);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    throw error;
  }
};

// Import routes AFTER middleware setup
let campaignRoutes, authRoutes, postRoutes, donationRoutes, contactRoutes, adminRoutes;

const initializeRoutes = async () => {
  try {
    campaignRoutes = require('../server/routes/campaignRoutes');
    authRoutes = require('../server/routes/authRoutes');
    postRoutes = require('../server/routes/postRoutes');
    donationRoutes = require('../server/routes/donationRoutes');
    contactRoutes = require('../server/routes/contactRoutes');
    adminRoutes = require('../server/routes/adminRoutes');
    console.log('✅ Routes initialized');
  } catch (error) {
    console.error('❌ Error initializing routes:', error.message);
  }
};

// Initialize on first request
let initialized = false;
app.use(async (req, res, next) => {
  if (!initialized) {
    try {
      await connectDB();
      await initializeRoutes();
      
      // Register routes
      app.use('/api/auth', authRoutes);
      app.use('/api/posts', postRoutes);
      app.use('/api/donations', donationRoutes);
      app.use('/api/contact', contactRoutes);
      app.use('/api/admin', adminRoutes);
      app.use('/api/campaigns', campaignRoutes);

      initialized = true;
      console.log('✅ API fully initialized');
    } catch (error) {
      console.error('❌ Initialization error:', error);
      return res.status(500).json({ error: 'Server initialization failed', details: error.message });
    }
  }
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    mongodb: isConnected ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'HelpingHands API Server', version: '1.0.0' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Export for Vercel
module.exports = app;
