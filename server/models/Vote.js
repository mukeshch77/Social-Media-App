const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  tag: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vote', VoteSchema);
