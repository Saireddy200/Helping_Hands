const User = require('../models/User');
const Post = require('../models/Post');
const Donation = require('../models/Donation');

// Get platform statistics
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments();
    const totalDonations = await Donation.countDocuments();
    
    const totalAmount = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const completedPosts = await Post.countDocuments({ status: 'completed' });
    const activePosts = await Post.countDocuments({ status: 'active' });
    
    const donors = await Donation.distinct('donorId');
    const receivers = await Post.distinct('createdBy');

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalPosts,
        activePosts,
        completedPosts,
        totalDonations,
        totalAmount: totalAmount[0]?.total || 0,
        uniqueDonors: donors.length,
        causesCreators: receivers.length
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users (admin only)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all posts (admin only)
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete post (admin only)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all donations (admin only)
exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('donorId', 'name email')
      .populate('postId', 'title')
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
