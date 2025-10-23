const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Post = require('../models/Post');

router.post('/', async (req, res) => {
  const { authorId, messageId, answer } = req.body;

  try {
    const author = await Users.findOne({ user_id: authorId });
    if (!author) return res.status(404).json({ error: 'Auteur introuvable' });

    const post = await Post.findOne({ post_id: messageId });
    if (!post) return res.status(404).json({ error: 'Message introuvable' });

    post.answers.push({
      message: answer,
      author: `${author.firstname} ${author.lastname}`
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
