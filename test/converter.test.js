const assert = require('assert');
const converter = require('../markdown/converter');

describe('it should convert markdown file to html file', function() {
  it('should return the names of folders under markdown', function() {
    const expected = ['activities', 'announcements', 'introductions', 'members'];
    const actual = converter.getTheNameOfAllChildFolders('./markdown/');
    assert.deepStrictEqual(actual, expected);
  });

  it('should return the names of folders under project root', function() {
    const expected = ['.git', '.idea', 'config', 'markdown', 'node_modules', 'src', 'test'];
    const actual = converter.getTheNameOfAllChildFolders('./');
    assert.deepStrictEqual(actual, expected);
  });

  it('should return the file names', function() {
    const expected = ['README.txt', 'converter.js'];
    const actual = converter.getTheNameOfAllFiles('./markdown/');
    assert.deepStrictEqual(actual, expected);
  });
});
