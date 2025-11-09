const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  postId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Please provide amount'],
    min: [1, 'Amount must be at least 1']
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donation', donationSchema);
