/**
 * Database connection manager
 * Falls back to mock database if MongoDB connection fails
 */

const mongoose = require('mongoose');
const { UserDB, PostDB, DonationDB, MessageDB } = require('./mockDb');

let isConnected = false;

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      ssl: true,
      retryWrites: false,
      w: 'majority',
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    isConnected = true;
    return conn;
  } catch (error) {
    console.error(`⚠️  MongoDB Connection Error: ${error.message}`);
    console.log('\n🔄 Falling back to in-memory mock database for development...\n');
    isConnected = false;
    return null;
  }
};

const isMongoDBConnected = () => isConnected;

const getDB = () => ({
  isConnected: isConnected,
  UserDB: isConnected ? require('../models/User') : UserDB,
  PostDB: isConnected ? require('../models/Post') : PostDB,
  DonationDB: isConnected ? require('../models/Donation') : DonationDB,
  MessageDB: isConnected ? require('../models/Message') : MessageDB,
});

module.exports = {
  connectDB,
  isMongoDBConnected,
  getDB,
  UserDB: isConnected ? null : UserDB,
  PostDB: isConnected ? null : PostDB,
  DonationDB: isConnected ? null : DonationDB,
  MessageDB: isConnected ? null : MessageDB,
};
