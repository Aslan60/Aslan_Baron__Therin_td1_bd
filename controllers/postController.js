const Post = require('../models/Post');
const Users = require('../models/Users');

exports.getAllMessages = async (req, res) => {
  const posts = await Post.find().sort({ creationDate: -1 });
  res.json(posts);
};

exports.createMessage = async (req, res) => {
  const { authorId, message } = req.body;
  const author = await Users.findOne({ user_id: authorId });
  if (!author) return res.status(404).json({ error: 'Auteur introuvable' });

  const postCount = await Post.countDocuments();
  const post = new Post({
    post_id: postCount + 1,
    message,
    author: `${author.firstname} ${author.lastname}`
  });

  await post.save();
  res.json(post);
};
