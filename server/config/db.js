const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    
    // Fix Windows + MongoDB Atlas SSL certificate issue
    const options = {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      ssl: true,
      retryWrites: true,
      w: 'majority',
      authSource: 'admin',
      family: 4, // Force IPv4
    };

    // On Windows, allow invalid certificates temporarily
    if (process.platform === 'win32') {
      options.tlsAllowInvalidCertificates = true;
      options.tlsAllowInvalidHostnames = true;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    console.log(`✅ Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Don't exit, allow server to continue with mock database fallback
    console.log('⚠️  Falling back to mock database...');
  }
};

module.exports = connectDB;
