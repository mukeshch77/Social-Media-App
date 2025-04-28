const express = require('express');
const Vote = require('../models/Vote');
const Post = require('../models/Post');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Vote for a post
router.post('/', protect, async (req, res) => {
  try {
    const { postId, tag } = req.body;
    const vote = await Vote.create({ userId: req.user, postId, tag });

    await Post.findByIdAndUpdate(postId, { $inc: { votes: 1 } });

    res.json({ message: 'Voted successfully' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
