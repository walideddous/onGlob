const express = require('express');
const {
  getBootcamp,
  getBootcamps,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps');

const advancedResults = require('../middleware/advancedResult');

const Bootcamp = require('../models/Bootcamps');

// Include other ressource routers
const courseRouter = require('./courses');

const router = express.Router();

// Re-route into other resource routersù
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(createBootcamps);
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamps);

router.route('/:id/photo').put(bootcampPhotoUpload);

module.exports = router;
