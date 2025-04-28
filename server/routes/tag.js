const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

// Get Trending Tags
router.get('/trending', async (req, res) => {
  try {
    const trending = await Post.aggregate([
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json(trending);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
