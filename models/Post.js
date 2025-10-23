const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  message: String,
  author: String,
  creationDate: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  post_id: { type: Number, required: true, unique: true },
  message: { type: String, required: true },
  author: { type: String, required: true },
  answers: [answerSchema],
  creationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
