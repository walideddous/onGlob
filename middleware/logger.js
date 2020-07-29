const logger = (req, res, next) => {
  console.log(req);
  req.hello = 'Heelo world';
  next();
};

module.exports = logger;
