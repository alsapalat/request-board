const uniqId = (length = 8, chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ') => {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
};

module.exports = {
  uniqId,
};