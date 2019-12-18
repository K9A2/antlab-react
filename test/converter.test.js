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

  it('should return the parsed yaml part of markdown file', function() {
    const expected = {
      title: '2019年9月迎新聚餐',
      date: '2019-09-04',
      top: false,
      content: '2019年9月，实验室迎来新成员，分别是梁文杰、叶子豪、郑雨昕，欢迎三位新同学加入实验室的大家庭。\n',
    };
    const actual = converter.loadMarkdownFile('./markdown/activities/2019年9月迎新聚餐.md');
    assert.deepStrictEqual(actual, expected);
  });
});
