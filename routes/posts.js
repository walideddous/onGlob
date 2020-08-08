const express = require('express');
const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  deleteComment,
} = require('../controllers/posts');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getPosts).post(protect, createPost);
router.route('/:id').get(protect, getPost).delete(protect, deletePost);
router.route('/likes/:id').put(protect, likePost);
router.route('/unlikes/:id').put(protect, unlikePost);
router.route('/comment/:id').post(protect, commentPost);
router.route('/comment/:id/:comment_id').delete(protect, deleteComment);

module.exports = router;
