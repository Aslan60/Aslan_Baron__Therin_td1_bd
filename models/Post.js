const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  message: String,
  author: String,
  creationDate: { type: Date, default: Date.now },
  answers: [this] // sous-réponses possibles
});

const postSchema = new mongoose.Schema({
  post_id: Number,
  message: String,
  author: String,
  answers: [answerSchema],
  creationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
