# Messengerify-Markdown

[![Build Status](https://travis-ci.org/frsechet/messengerify-markdown.svg?branch=master)](https://travis-ci.org/frsechet/messengerify-markdown)
[![codecov](https://codecov.io/gh/frsechet/messengerify-markdown/branch/master/graph/badge.svg)](https://codecov.io/gh/frsechet/messengerify-markdown)

Messengerify-Markdown is a Markdown to [Messenger-specific-markdown](https://www.facebook.com/help/147348452522644) converter, based on [Unified](https://github.com/unifiedjs/unified) and [Remark](https://github.com/remarkjs/remark/).

Forked from [jsarafajr](https://github.com/jsarafajr)'s [Slackify-Markdown](https://github.com/jsarafajr/slackify-markdown)

## Install

```bash
npm install messengerify-markdown
```

## Usage

```js
const messengerifyMarkdown = require('messengerify-markdown');
const markdown = `
# List of items

* item 1
* item 2
* item 3

[here is an example](https://example.com)
`;

messengerifyMarkdown(markdown);
/*
 *List of items*

 • item 1
 • item 2
 • item 3

 https://example.com
/*
```

### Copyright and License

Copyright François Falala-Sechet, 2020

[MIT Licence](LICENSE)
