const express = require('express');
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const advancedResults = require('../middleware/advancedResult');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');

router.use(protect);
router.use(authorize('admin'));

router.route('/').get(advancedResults(User), getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
