const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Post = require('../models/Post');

router.post('/', async (req, res) => {
  const { authorId, message } = req.body;

  try {
    const author = await Users.findOne({ user_id: authorId });
    if (!author) return res.status(404).json({ error: 'Auteur introuvable' });

    const newPost = await Post.create({
      post_id: Date.now(),
      message,
      author: `${author.firstname} ${author.lastname}`
    });

    res.json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
