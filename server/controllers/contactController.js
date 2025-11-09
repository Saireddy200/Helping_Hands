const Message = require('../models/Message');

// Create message
exports.createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    let msg = new Message({
      name,
      email,
      subject,
      message
    });

    msg = await msg.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: msg
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all messages (admin only)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single message (admin only)
exports.getMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({
      success: true,
      message
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update message status (admin only)
exports.updateMessageStatus = async (req, res) => {
  try {
    const { status, reply } = req.body;

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status, reply },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({
      success: true,
      message
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete message (admin only)
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
