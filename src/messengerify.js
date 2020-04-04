const { Compiler } = require('remark-stringify');
const { wrap } = require('./utils');


const visitors = {
  heading(node) {
    // make headers to be just *strong*
    return wrap(this.content(node), '*');
  },

  strong(node) {
    return wrap(this.content(node), '*');
  },

  delete(node) {
    return wrap(this.content(node), '~');
  },

  emphasis(node) {
    return wrap(this.content(node), '_');
  },

  list(node) {
    const listItem = this.visitors.listItem.bind(this);

    return node.children.map((child, index) => {
      const bullet = node.ordered
        ? `${node.start + index}.`
        : '•';
      return listItem(child, node, index, bullet);
    }).join('\n');
  },

  code(node) {
    // delete language prefix for deprecated markdown formatters (old Bitbucket Editor)
    const content = node.value.replace(/^#![a-z]+\n/, ''); // ```\n#!javascript\ncode block\n```
    return wrap(content, '```', '\n');
  },

  link(node) {
    const text = node.title || this.content(node);
    return this.visitors.url.call(this, node, text);
  },

  image(node) {
    const text = node.title || node.alt;
    return this.visitors.url.call(this, node, text);
  },

  url(node, text) {
    return this.encode(node.url || '', node);
  },
};

class MessengerCompiler extends Compiler {
  constructor(...args) {
    super(...args);
    this.visitors = Object.assign(this.visitors, visitors);
    this.escape = this.messengerEscape.bind(this);
  }

  messengerEscape(value, node, parent) {
    return value;
  }

  content(node) {
    return this.all(node).join('');
  }
}

module.exports = function messengerify() {
  this.Compiler = MessengerCompiler;
};