const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  getAllCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  likeCampaign,
  addComment,
  donateToCampaign,
  getUserCampaigns
} = require('../controllers/campaignController');

// Public routes
router.get('/', getAllCampaigns);
router.get('/:id', getCampaign);

// Protected routes
router.post('/', authenticate, createCampaign);
router.put('/:id', authenticate, updateCampaign);
router.delete('/:id', authenticate, deleteCampaign);
router.post('/:id/like', authenticate, likeCampaign);
router.post('/:id/comments', authenticate, addComment);
router.post('/:id/donate', authenticate, donateToCampaign);
router.get('/user/my-campaigns', authenticate, getUserCampaigns);

module.exports = router;
