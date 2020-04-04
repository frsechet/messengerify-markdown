const unified = require('unified');
const parse = require('remark-parse');
const messengerify = require('./messengerify');

const defaultOptions = {
  pedantic: true,
};

module.exports = (markdown, options) => {
  options = {
    ...defaultOptions,
    ...options,
  };

  return unified()
    .use(parse, options)
    .use(messengerify)
    .processSync(markdown)
    .toString()
    .trim();
};
