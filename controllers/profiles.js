const asyncHandler = require('../middleware/async');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Post = require('../models/Post');
const ErrorResponse = require('../utils/errorResponse');
const { findOneAndUpdate } = require('../models/Profile');

// @route  Get api/profile/me
// @desc   Get current users profile
// @access Private

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await Profile.findOne({ user: req.user.id }).populate('user', [
    'name',
  ]);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @route POST  api/profile
// @desc Create user profile
// @ access Private

exports.createProfile = asyncHandler(async (req, res, next) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  // Build profile object

  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(',').map((skill) => skill.trim());
  }

  // Build social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (facebook) profileFields.social.facebook = facebook;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;

  //create
  profile = await Profile.create(profileFields);

  res.status(200).json({
    success: true,
    data: profile,
  });
});

// @route PUT  api/profile
// @desc Update user profile
// @ access Private

exports.updateProfile = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return next(
      new ErrorResponse(`No profile exist with the id of ${req.user.id}`, 404)
    );
  }

  profile = await Profile.findOneAndUpdate({ user: req.user.id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: profile,
  });
});

// @route GET  api/profile
// @desc GET all profiles
// @ access Pubic

exports.getUsers = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find().populate('user', ['name']);

  res.status(200).json({
    success: true,
    data: profiles,
  });
});

// @route GET  api/profile/user/user_id
// @desc GET profile by user id
// @ access Pubic

exports.getUserById = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({
    user: req.params.id,
  }).populate('user', ['name']);

  if (!profile) {
    return next(
      new ErrorResponse(`No profile exist with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: profile,
  });
});

// @route DELETE api/profile
// @desc Delete profile , user & posts
// @ access Private

exports.deleteProfile = asyncHandler(async (req, res, next) => {
  // Remove user posts
  await Post.deleteMany({ user: req.user.id });
  // remove profile
  await Profile.findOneAndRemove({ user: req.user.id });
  // remove user
  await User.findOneAndRemove({ _id: req.user.id });

  res.status(200).json({
    success: true,
    msg: 'Profile deleted succesfuly',
  });
});

// @route  Put api/profile/experience
// @desc   Add profile experience
// @access Private

exports.updateExperience = asyncHandler(async (req, res, next) => {
  const {
    title,
    company,
    location,
    since,
    to,
    current,
    description,
  } = req.body;

  const newExp = {
    title,
    company,
    location,
    since,
    to,
    current,
    description,
  };

  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return next(
      new ErrorResponse(`No profile exist with the id of ${req.user.id}`, 404)
    );
  }

  profile.experience.unshift(newExp);

  await profile.save();

  res.status(200).json({
    success: true,
    data: profile,
  });
});

// @route  Delete api/profile/experiencce/:exp_id
// @desc   delete experience from profile
// @access Private

exports.deleteExperience = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return next(
      new ErrorResponse(`No profile exist with the id of ${req.user.id}`, 404)
    );
  }

  //Get remove index
  const removeIndex = profile.experience
    .map((item) => item.id)
    .indexOf(req.params.exp_id);

  profile.experience.splice(removeIndex, 1);

  await profile.save();

  res.status(200).json({
    success: true,
    data: profile,
  });
});

// @route Put api/profile/education
// @desc Add profile education
// @ access Private

exports.updateEducation = asyncHandler(async (req, res, next) => {
  const {
    school,
    degree,
    fieldofstudy,
    since,
    to,
    current,
    description,
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    since,
    to,
    current,
    description,
  };

  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return next(
      new ErrorResponse(`No profile exist with the id of ${req.user.id}`, 404)
    );
  }

  profile.education.unshift(newEdu);

  await profile.save();

  res.status(200).json({
    success: true,
    data: profile,
  });
});

// @route Delete api/profile/education/:exp_id
// @desc delete education from profile
// @ express Private

exports.deleteEducation = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return next(
      new ErrorResponse(`No profile exist with the id of ${req.user.id}`, 404)
    );
  }

  //Get remove index
  const removeIndex = profile.education
    .map((item) => item.id)
    .indexOf(req.params.edu_id);

  profile.education.splice(removeIndex, 1);

  await profile.save();
});

// @route GET api/profile/github/:username
// @desc Get user repos from Github
// @ express Public

exports.getGithub = asyncHandler(async (req, res, next) => {
  const options = {
    uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.githubClientId}&client_secret=${process.env.githubSecret}`,
    method: 'GET',
    headers: { 'user-agent': 'node.js' },
  };

  request(options, (error, response, body) => {
    if (error) console.error(error);

    if (response.statusCode !== 200) {
      res.status(404).json({ msg: 'No Github profile found' });
    }

    res.json(JSON.parse(body));
  });
});
