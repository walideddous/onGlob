const express = require('express');
const {
  getBootcamp,
  getBootcamps,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  getBootcampsInRadius,
} = require('../controllers/bootcamps');

// Include other ressource routers
const courseRouter = require('./courses');

const router = express.Router();

// Re-route into other resource routersù
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/').get(getBootcamps).post(createBootcamps);
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamps);

module.exports = router;
