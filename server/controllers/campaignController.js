const Campaign = require('../models/Campaign');
const User = require('../models/User');
let { CampaignDB } = require('../db/mockDb');
const mongoose = require('mongoose');

// Helper to check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Get all campaigns with filters
exports.getAllCampaigns = async (req, res) => {
  try {
    console.log('🔍 GET /campaigns request received');
    const { category, status, sortBy } = req.query;
    let filter = {};

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    let campaigns;
    if (isMongoConnected()) {
      // Use MongoDB
      let sortOption = { createdAt: -1 };
      if (sortBy === 'mostFunded') {
        sortOption = { amountRaised: -1 };
      } else if (sortBy === 'nearCompletion') {
        sortOption = { progress: -1 };
      }

      campaigns = await Campaign.find(filter)
        .populate('createdBy', 'name avatar')
        .sort(sortOption)
        .limit(100);
    } else {
      // Use mock database
      campaigns = await CampaignDB.find(filter);
      
      // Apply sorting
      if (sortBy === 'mostFunded') {
        campaigns.sort((a, b) => b.amountRaised - a.amountRaised);
      } else if (sortBy === 'nearCompletion') {
        campaigns.sort((a, b) => (b.amountRaised / b.amountNeeded) - (a.amountRaised / a.amountNeeded));
      } else {
        campaigns.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      
      campaigns = campaigns.slice(0, 100);
    }

    console.log(`✅ Found ${campaigns.length} campaigns`);
    res.status(200).json({
      success: true,
      count: campaigns.length,
      campaigns
    });
  } catch (error) {
    console.error('❌ Get campaigns error:', error);
    res.status(500).json({ message: 'Error fetching campaigns', error: error.message });
  }
};

// Get single campaign
exports.getCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate('createdBy', 'name avatar email')
      .populate('comments.userId', 'name avatar');

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    res.status(200).json({
      success: true,
      campaign
    });
  } catch (error) {
    console.error('Get campaign error:', error);
    res.status(500).json({ message: 'Error fetching campaign', error: error.message });
  }
};

// Create campaign
exports.createCampaign = async (req, res) => {
  try {
    const { title, description, category, amountNeeded, images } = req.body;

    // Validation
    if (!title || !description || !amountNeeded) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const campaign = new Campaign({
      title,
      description,
      category,
      amountNeeded,
      images: images || [],
      createdBy: req.user.id
    });

    await campaign.save();
    await campaign.populate('createdBy', 'name avatar');

    console.log('✅ Campaign created:', campaign.title);

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      campaign
    });
  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(500).json({ message: 'Error creating campaign', error: error.message });
  }
};

// Update campaign
exports.updateCampaign = async (req, res) => {
  try {
    let campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Check if user owns campaign
    if (campaign.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this campaign' });
    }

    campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name avatar');

    res.status(200).json({
      success: true,
      message: 'Campaign updated successfully',
      campaign
    });
  } catch (error) {
    console.error('Update campaign error:', error);
    res.status(500).json({ message: 'Error updating campaign', error: error.message });
  }
};

// Delete campaign
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Check if user owns campaign
    if (campaign.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this campaign' });
    }

    await Campaign.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Campaign deleted successfully'
    });
  } catch (error) {
    console.error('Delete campaign error:', error);
    res.status(500).json({ message: 'Error deleting campaign', error: error.message });
  }
};

// Like campaign
exports.likeCampaign = async (req, res) => {
  try {
    let campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const userId = req.user.id;
    const alreadyLiked = campaign.likedBy.includes(userId);

    if (alreadyLiked) {
      campaign.likedBy = campaign.likedBy.filter(id => id.toString() !== userId);
      campaign.likes = Math.max(0, campaign.likes - 1);
    } else {
      campaign.likedBy.push(userId);
      campaign.likes += 1;
    }

    await campaign.save();

    res.status(200).json({
      success: true,
      likes: campaign.likes,
      liked: !alreadyLiked
    });
  } catch (error) {
    console.error('Like campaign error:', error);
    res.status(500).json({ message: 'Error liking campaign', error: error.message });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Please provide comment text' });
    }

    let campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const user = await User.findById(req.user.id);

    campaign.comments.push({
      userId: req.user.id,
      name: user.name,
      text
    });

    await campaign.save();
    await campaign.populate('comments.userId', 'name avatar');

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      comments: campaign.comments
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
};

// Donate to campaign
exports.donateToCampaign = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Please provide valid donation amount' });
    }

    let campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    campaign.amountRaised += amount;

    if (campaign.amountRaised >= campaign.amountNeeded) {
      campaign.status = 'completed';
    }

    await campaign.save();

    res.status(200).json({
      success: true,
      message: 'Donation successful',
      campaign,
      newTotal: campaign.amountRaised
    });
  } catch (error) {
    console.error('Donation error:', error);
    res.status(500).json({ message: 'Error processing donation', error: error.message });
  }
};

// Get user's campaigns
exports.getUserCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ createdBy: req.user.id })
      .populate('createdBy', 'name avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: campaigns.length,
      campaigns
    });
  } catch (error) {
    console.error('Get user campaigns error:', error);
    res.status(500).json({ message: 'Error fetching campaigns', error: error.message });
  }
};
