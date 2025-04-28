const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: { type: String },
  tags: [{ type: String }],
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  votes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
