const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllMessages);
router.post('/create', postController.createMessage);

module.exports = router;
