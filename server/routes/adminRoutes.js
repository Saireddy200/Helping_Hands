const express = require('express');
const { getStats, getUsers, deleteUser, getPosts, deletePost, getDonations } = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication and admin role
router.use(authenticate, authorize('admin'));

router.get('/stats', getStats);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.get('/posts', getPosts);
router.delete('/posts/:id', deletePost);
router.get('/donations', getDonations);

module.exports = router;
