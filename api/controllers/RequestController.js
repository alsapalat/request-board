const _ = require('lodash');

const index = (req, res) => {
  const tags = (_.get(req, 'query.tags') || '')
    .split(',')
    .map(x => x.trim());
  const status = (_.get(req, 'query.status') || '')
    .split(',')
    .map(x => x.trim());
  if (false) console.log({ tags, status });
  res.json([]);
};

const createBySlug = (req, res) => {
  const slug = _.get(req, 'params.slug');
  if (!slug) {
    return res.status(400).json({
      message: 'slug is required',
    });
  }
  require('../index').socketServer.broadcast({
    type: 'REQUEST_POSTED',
  });
  res.json({ id: 1 });
};

module.exports = {
  index,
  createBySlug,
};
