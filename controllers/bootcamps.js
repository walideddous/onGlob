const Bootcamp = require('../models/Bootcamps');

//@Desc   Get all Bootcamps
//@route  GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    if (!bootcamps) {
      return res.status(404).json({
        sucess: true,
        msg: 'The given ID doesnt exist',
      });
    }

    res.status(200).json({
      succes: true,
      count: bootcamps.length,
      data: bootcamps,
    });
  } catch (err) {
    res.status(400).json({ sucess: false });
  }
};

//@Desc   Get  Bootcamp
//@route  GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamps) {
      return res.status(200).json({
        sucess: true,
        msg: 'Bootcamp with this Id dont exist',
      });
    }

    res.status(200).json({
      succes: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({ sucess: false });
  }
};

//@Desc   Create Bootcamps
//@route  POST /api/v1/bootcamps
//@access Private
exports.createBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(200).json({
      succes: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({ sucess: false });
  }
};

//@Desc   Update Bootcamps
//@route  PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return res.status().json({ success: false });
    }

    res.status(200).json({
      succes: true,
      data: bootcamp,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, msg: 'fail to update the Bootcamp' });
  }
};
//@Desc   Delete Bootcamps
//@route  DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findOneAndDelete(req.params.id);

    res.status(200).json({
      succes: true,
      data: bootcamp,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, msg: 'fail to delete the Bootcamp' });
  }
};
