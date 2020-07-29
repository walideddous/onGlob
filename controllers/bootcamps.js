//@Desc   Get all Bootcamps
//@route  GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({
    succes: true,
    msg: 'Show all bootcamps',
    hello: req.hello,
  });
};

//@Desc   Get  Bootcamp
//@route  GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    succes: true,
    msg: `Show bootcamps${req.params.id}`,
  });
};

//@Desc   Create Bootcamps
//@route  POST /api/v1/bootcamps
//@access Private
exports.createBootcamps = (req, res, next) => {
  res.status(200).json({
    succes: true,
    msg: `Create bootcamps`,
  });
};

//@Desc   Update Bootcamps
//@route  PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamps = (req, res, next) => {
  res.status(200).json({
    succes: true,
    msg: `Update bootcamps${req.params.id}`,
  });
};
//@Desc   Delete Bootcamps
//@route  DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamps = (req, res, next) => {
  res.status(200).json({
    succes: true,
    msg: `Delete bootcamps${req.params.id}`,
  });
};
