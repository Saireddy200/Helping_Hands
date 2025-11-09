const express = require('express');
const { createMessage, getMessages, getMessage, updateMessageStatus, deleteMessage } = require('../controllers/contactController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', createMessage);
router.get('/', authenticate, authorize('admin'), getMessages);
router.get('/:id', authenticate, authorize('admin'), getMessage);
router.put('/:id', authenticate, authorize('admin'), updateMessageStatus);
router.delete('/:id', authenticate, authorize('admin'), deleteMessage);

module.exports = router;
