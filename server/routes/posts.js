const express = require('express');
const multer = require('multer');
const Post = require('../models/Post');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Upload Post
router.post('/upload', protect, upload.single('image'), async (req, res) => {
  try {
    const { caption, tags } = req.body;
    const newPost = await Post.create({
      imageUrl: req.file.path,
      caption,
      tags: tags.split(','),
      uploader: req.user
    });
    res.json(newPost);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get Posts by Tag
router.get('/tag/:tag', async (req, res) => {
  try {
    const posts = await Post.find({ tags: req.params.tag });
    res.json(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
