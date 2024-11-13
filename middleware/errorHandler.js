const errorHandler = (err, req, res, next) => {
  const errors = {
    msg: err.message || "server error not your fault😢😢😣",
    code: err.statusCode || 500,
  };

  res.status(errors.code).json({ message: errors.msg });
};
module.exports = errorHandler;
