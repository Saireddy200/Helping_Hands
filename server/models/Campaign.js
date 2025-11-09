const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a campaign title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  category: {
    type: String,
    enum: ['Medical', 'Education', 'Food', 'Animals', 'Disaster Relief', 'Community Development', 'Other'],
    default: 'Other'
  },
  amountNeeded: {
    type: Number,
    required: [true, 'Please specify the amount needed'],
    min: [100, 'Amount must be at least 100']
  },
  amountRaised: {
    type: Number,
    default: 0,
    min: 0
  },
  images: {
    type: [String],
    default: []
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: {
    type: [mongoose.Schema.ObjectId],
    ref: 'User',
    default: []
  },
  comments: [
    {
      userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      name: String,
      text: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate progress percentage
campaignSchema.virtual('progress').get(function () {
  return Math.min((this.amountRaised / this.amountNeeded) * 100, 100);
});

module.exports = mongoose.model('Campaign', campaignSchema);
