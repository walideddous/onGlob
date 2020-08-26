const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Post = require('../models/Post');
const User = require('../models/User');
const { remove } = require('../models/Post');

// @route  POST api/posts
// @desc   Create a posts
// @access Private

exports.createPost = asyncHandler(async (req, res, next) => {
  const newPost = {
    name: req.user.name,
    user: req.user.id,
    ...req.body,
  };

  const post = await Post.create(newPost);

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @route  GET api/posts
// @desc   Get all posts
// @access Private

exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({}).sort({ date: -1 });

  if (!posts) {
    return next(new ErrorResponse(`There are no Post`, 404));
  }

  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts,
  });
});

// @route  GET api/posts/:id
// @desc   Get posts by Id
// @access Private

exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`There are no Post with this id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @route  DELETE api/posts/:id
// @desc   Delete posts by id
// @access Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`There are no Post with this id ${req.params.id}`, 404)
    );
  }

  await post.remove();

  res.status(200).json({
    success: true,
    data: 'Post has been deleted',
  });
});

// @route  PUT api/posts/like/:id
// @desc   Like a post
// @access Private
exports.likePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`There are no Post with this id ${req.params.id}`, 404)
    );
  }

  const likes = { user: req.user.id };

  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
  ) {
    return next(
      new ErrorResponse(`You cannot like the same post more than one`, 400)
    );
  }

  post.likes.unshift(likes);
  await post.save();

  res.status(200).json({
    success: true,
    data: post.likes,
  });
});

// @route  PUT api/posts/unlike/:id
// @desc   UNLike a post
// @access Private

exports.unlikePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`There are no Post with this id ${req.params.id}`, 404)
    );
  }

  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length ===
    0
  ) {
    return next(new ErrorResponse(`Post has not yet been liked`, 400));
  }
  const removeIndex = post.likes
    .map((like) => like.user.toString())
    .indexOf(req.user.id);

  post.likes.splice(removeIndex, 1);

  await post.save();

  res.status(200).json({
    success: true,
    data: post.likes,
  });
});

// @route  POST api/posts/comment/:id
// @desc   Comment on a post
// @access Private
exports.commentPost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`There are no Post with this id ${req.params.id}`, 404)
    );
  }

  const newComment = {
    user: req.user.id,
    text: req.body.text,
    name: req.user.name,
  };

  post.comments.unshift(newComment);
  await post.save();

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Delete comment
// @access Private

exports.deleteComment = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`There are no Post with this id ${req.params.id}`, 404)
    );
  }

  //Pull out comment
  const comment = post.comments.find(
    (comment) => comment.id === req.params.comment_id
  );

  if (!comment) {
    return next(
      new ErrorResponse(
        `There are no comment with the id ${req.params.comment_id}`,
        404
      )
    );
  }

  //Check user
  if (comment.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`'User not authorized'`, 401));
  }

  const removeIndex = post.comments
    .map((comment) => comment.user.toString())
    .indexOf(req.user.id);

  post.comments.splice(removeIndex, 1);
  await post.save();

  res.status(200).json({
    success: true,
    data: post,
  });
});
