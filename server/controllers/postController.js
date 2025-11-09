const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const { category, location, search, status } = req.query;

    let query = {};

    if (category) query.category = category;
    if (location) query.location = new RegExp(location, 'i');
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    const posts = await Post.find(query)
      .populate('createdBy', 'name email avatar')
      .populate('donors', 'name avatar')
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

// Get single post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('createdBy', 'name email avatar phone location')
      .populate('donors', 'name avatar');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({
      success: true,
      post
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create post
exports.createPost = async (req, res) => {
  try {
    const { title, description, requiredAmount, category, location } = req.body;

    let post = new Post({
      title,
      description,
      requiredAmount,
      category,
      location,
      createdBy: req.user.id
    });

    if (req.file) {
      post.image = `/uploads/${req.file.filename}`;
    }

    post = await post.save();
    post = await post.populate('createdBy', 'name email avatar');

    res.status(201).json({
      success: true,
      post
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is post creator
    if (post.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const { title, description, requiredAmount, category, location, status } = req.body;

    if (title) post.title = title;
    if (description) post.description = description;
    if (requiredAmount) post.requiredAmount = requiredAmount;
    if (category) post.category = category;
    if (location) post.location = location;
    if (status) post.status = status;

    if (req.file) {
      // Delete old image if exists
      if (post.image) {
        const oldImagePath = path.join(__dirname, '../' + post.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      post.image = `/uploads/${req.file.filename}`;
    }

    post = await post.save();

    res.status(200).json({
      success: true,
      post
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is post creator
    if (post.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    // Delete image if exists
    if (post.image) {
      const imagePath = path.join(__dirname, '../' + post.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's posts
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user.id })
      .populate('createdBy', 'name email avatar')
      .populate('donors', 'name avatar')
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
