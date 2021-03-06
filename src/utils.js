const { URL } = require('url');

module.exports = {
  wrap(string, ...wrappers) {
    return [
      ...wrappers,
      string,
      ...wrappers.reverse(),
    ].join('');
  },
};
