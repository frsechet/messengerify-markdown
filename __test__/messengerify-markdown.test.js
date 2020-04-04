const messengerifyMarkdown = require('..');

test('Simple text', () => {
  expect(messengerifyMarkdown('hello world')).toBe('hello world');
});

test('Escaped text', () => {
  expect(messengerifyMarkdown('*h&ello>world<')).toBe('*h&ello>world<');
});

test('Headings', () => {
  const mrkdown = '# heading 1\n## heading 2\n### heading 3';
  const messenger = '*heading 1*\n\n*heading 2*\n\n*heading 3*';
  expect(messengerifyMarkdown(mrkdown)).toBe(messenger);
});

test('Bold', () => {
  const mrkdown = '**bold text**';
  const messenger = '*bold text*';
  expect(messengerifyMarkdown(mrkdown)).toBe(messenger);
});

test('Bold character in word', () => {
  expect(messengerifyMarkdown('he**l**lo')).toBe('he*l*lo');
});

test('Italic', () => {
  const mrkdown = '*italic text*';
  const messenger = '_italic text_';
  expect(messengerifyMarkdown(mrkdown)).toBe(messenger);
});

test('Bold+Italic', () => {
  const mrkdown = '***bold+italic***';
  const messenger = '*_bold+italic_*';
  expect(messengerifyMarkdown(mrkdown)).toBe(messenger);
});

test('Strike', () => {
  const mrkdown = '~~strike text~~';
  const messenger = '~strike text~';
  expect(messengerifyMarkdown(mrkdown)).toBe(messenger);
});

test('Unordered list', () => {
  const mrkdown = '* list\n* list\n* list';
  const messenger = '•   list\n•   list\n•   list';
  expect(messengerifyMarkdown(mrkdown)).toBe(messenger);
});

test('Ordered list', () => {
  const mrkdown = '1. list\n2. list\n3. list';
  const messenger = '1.  list\n2.  list\n3.  list';
  expect(messengerifyMarkdown(mrkdown)).toBe(messenger);
});

test('Link', () => {
  const mrkdown = '[http://atlassian.com](http://atlassian.com)';
  const messenger = 'http://atlassian.com';
  expect(messengerifyMarkdown(mrkdown)).toBe(messenger);
});

test('Link with title', () => {
  const mrkdown = '[test](http://atlassian.com)';
  const messenger = 'http://atlassian.com';
  expect(messengerifyMarkdown(mrkdown)).toBe(messenger);
});

test('Invalid link', () => {
  const mrkdown = '[test](/atlassian)';
  const messenger = '/atlassian';
  expect(messengerifyMarkdown(mrkdown)).toBe(messenger);
});

test('Image', () => {
  const mrkdown = '![logo.png](https://bitbucket.org/repo/123/images/logo.png)';
  const messenger = 'https://bitbucket.org/repo/123/images/logo.png';
  expect(messengerifyMarkdown(mrkdown)).toBe(messenger);
});

test('Image with alt-title', () => {
  const mrkdown = "![logo.png](https://bitbucket.org/repo/123/images/logo.png 'test')";
  const messenger = 'https://bitbucket.org/repo/123/images/logo.png';
  expect(messengerifyMarkdown(mrkdown)).toBe(messenger);
});

test('Image with no alt-title', () => {
  const mrkdown = '![](https://bitbucket.org/repo/123/images/logo.png)';
  const messenger = 'https://bitbucket.org/repo/123/images/logo.png';
  expect(messengerifyMarkdown(mrkdown)).toBe(messenger);
});

test('Image with invalid link', () => {
  const mrkdown = "![logo.png](/relative-path-logo.png 'test')";
  const messenger = '/relative-path-logo.png';
  expect(messengerifyMarkdown(mrkdown)).toBe(messenger);
});

test('Inline code', () => {
  const mrkdown = 'hello `world`';
  const messenger = 'hello `world`';
  expect(messengerifyMarkdown(mrkdown)).toBe(messenger);
});

test('Code block', () => {
  const mrkdown = '```\ncode block\n```';
  const messenger = '```\ncode block\n```';
  expect(messengerifyMarkdown(mrkdown)).toBe(messenger);
});

test('Code block with language', () => {
  const mrkdown = '```javascript\ncode block\n```';
  const messenger = '```\ncode block\n```';
  expect(messengerifyMarkdown(mrkdown)).toBe(messenger);
});

test('Code block with deprecated language declaration', () => {
  const mrkdown = '```\n#!javascript\ncode block\n```';
  const messenger = '```\ncode block\n```';
  expect(messengerifyMarkdown(mrkdown)).toBe(messenger);
});
