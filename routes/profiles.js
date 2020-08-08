const express = require('express');
const {
  getMe,
  getUsers,
  getUserById,
  createProfile,
  updateProfile,
  deleteProfile,
  updateExperience,
  deleteExperience,
  updateEducation,
  deleteEducation,
  getGithub,
} = require('../controllers/profiles');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/me').get(protect, getMe);
router
  .route('/')
  .get(getUsers)
  .post(protect, createProfile)
  .put(protect, updateProfile)
  .delete(protect, deleteProfile);

router.route('/experience').put(protect, updateExperience);
router.route('/experience/:exp_id').delete(protect, deleteExperience);

router.route('/education').put(protect, updateEducation);
router.route('/education/:edu_id').delete(protect, deleteEducation);

router.route('/github/:username').get(getGithub);

router.route('/user/:id').get(getUserById);

module.exports = router;
