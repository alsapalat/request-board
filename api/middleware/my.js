const middleware = (req, res, next) => {
  // jwt validation here
  next();
};

module.exports = middleware;