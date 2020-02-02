const cors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
};

module.exports = cors;