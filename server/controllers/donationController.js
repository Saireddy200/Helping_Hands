const Donation = require('../models/Donation');
const Post = require('../models/Post');
const User = require('../models/User');
const { sendDonationNotification } = require('../utils/emailService');

// Create donation
exports.createDonation = async (req, res) => {
  try {
    const { postId, amount } = req.body;

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create donation
    let donation = new Donation({
      donorId: req.user.id,
      postId,
      amount,
      transactionId: `TXN-${Date.now()}`
    });

    donation = await donation.save();

    // Update post collected amount
    post.collectedAmount += amount;

    // Add donor to post's donors list if not already present
    if (!post.donors.includes(req.user.id)) {
      post.donors.push(req.user.id);
    }

    // Check if goal is reached
    if (post.collectedAmount >= post.requiredAmount) {
      post.status = 'completed';
    }

    await post.save();

    // Get donor and post creator info for email
    const donor = await User.findById(req.user.id);
    const postCreator = await User.findById(post.createdBy);

    // Send notification email
    await sendDonationNotification(donor.name, postCreator.email, post.title, amount);

    donation = await donation.populate('donorId', 'name email avatar');
    donation = await donation.populate('postId', 'title');

    res.status(201).json({
      success: true,
      message: 'Donation created successfully',
      donation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all donations
exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('donorId', 'name email avatar')
      .populate('postId', 'title requiredAmount')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      donations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user donations
exports.getUserDonations = async (req, res) => {
  try {
    const { userId } = req.params;

    const donations = await Donation.find({ donorId: userId })
      .populate('postId', 'title image requiredAmount collectedAmount')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      donations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get donations for a post
exports.getPostDonations = async (req, res) => {
  try {
    const { postId } = req.params;

    const donations = await Donation.find({ postId })
      .populate('donorId', 'name email avatar')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      donations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get donation statistics
exports.getDonationStats = async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const totalAmount = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const totalDonors = await Donation.distinct('donorId');
    const completedPosts = await Post.countDocuments({ status: 'completed' });

    res.status(200).json({
      success: true,
      stats: {
        totalDonations,
        totalAmount: totalAmount[0]?.total || 0,
        uniqueDonors: totalDonors.length,
        completedCauses: completedPosts
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
