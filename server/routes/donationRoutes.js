const express = require('express');
const { createDonation, getDonations, getUserDonations, getPostDonations, getDonationStats } = require('../controllers/donationController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, createDonation);
router.get('/', getDonations);
router.get('/stats/all', getDonationStats);
router.get('/user/:userId', getUserDonations);
router.get('/post/:postId', getPostDonations);

module.exports = router;
