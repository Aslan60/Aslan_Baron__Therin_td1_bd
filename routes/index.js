const express = require('express');
const router = express.Router();

// Import des routes
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const addMessageRoutes = require('./addMessage');

// Définir les sous-routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/addMessage', addMessageRoutes);

module.exports = router;
