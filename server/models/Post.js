const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  image: {
    type: String,
    default: null
  },
  requiredAmount: {
    type: Number,
    required: [true, 'Please provide required amount']
  },
  collectedAmount: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    enum: ['medical', 'education', 'emergency', 'community', 'other'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'closed'],
    default: 'active'
  },
  donors: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
