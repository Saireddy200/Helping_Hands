const express = require('express');
const { getPosts, getPost, createPost, updatePost, deletePost, getUserPosts } = require('../controllers/postController');
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', authenticate, upload.single('image'), createPost);
router.put('/:id', authenticate, upload.single('image'), updatePost);
router.delete('/:id', authenticate, deletePost);
router.get('/user/my-posts', authenticate, getUserPosts);

module.exports = router;
