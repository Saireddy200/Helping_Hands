const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role: role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

exports.generateResetToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

exports.getResetTokenHash = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};
