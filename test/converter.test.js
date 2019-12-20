const assert = require('assert');
const converter = require('../markdown/converter');

describe('it should convert markdown file to html file', function () {
  it('should return the names of folders under markdown', function () {
    const expected = ['activities', 'announcements', 'introductions', 'members'];
    const actual = converter.getTheNameOfAllChildFolders('./markdown/');
    assert.deepStrictEqual(actual, expected);
  });

  it('should return the names of folders under project root', function () {
    const expected = ['.git', 'config', 'markdown', 'node_modules', 'src', 'test'];
    const actual = converter.getTheNameOfAllChildFolders('./');
    assert.deepStrictEqual(actual, expected);
  });

  it('should return the file names', function () {
    const expected = ['README.txt', 'converter.js'];
    const actual = converter.getTheNameOfAllFiles('./markdown/');
    assert.deepStrictEqual(actual, expected);
  });

  it('should return the parsed yaml part of markdown file', function () {
    const expected = {
      title: '2019年9月迎新聚餐',
      date: '2019-10-10',
      top: false,
      content: '2019年9月，实验室迎来新成员，分别是梁文杰、叶子豪、郑雨昕，欢迎三位新同学加入实验室的大家庭。\n\n' +
        '![实验室聚餐合照](./files/a0131d42-4c6c-477f-8669-17125fbc0817.jpg)\n',
    };
    const actual = converter.loadMarkdownFile('./markdown/activities/2019年9月迎新聚餐.md');
    assert.deepStrictEqual(actual, expected);
  });

  it('should only list all file names of markdown files', function () {
    const expected = [
      '2017年12月29日实验室部分研究生游清远.md',
      '2019年6月实验室成员游番禺宝墨园、佛山顺德.md',
      '2019年9月迎新聚餐.md',
      '欢送实验室2016级专硕研究生张羽翔和张凤洁顺利毕业.md',
      '欢送实验室2016级学硕研究生张媛顺利毕业.md',
    ];
    const actual = converter.filterOutFileNamesByExtName(
      converter.getTheNameOfAllFiles('./markdown/activities/'), '.md'
    );
    assert.deepStrictEqual(actual, expected);
  });

  it('should print all markdown file object', function () {
    const markdownFileList = [
      '实验室硕士生林晋霆的论文被国际期刊Computer Networks录用.md',
      '实验室硕士生张羽翔的论文被国际期刊IEEE Transactions on Network and Service Management录用.md',
      '实验室研究生荣获研究生2019年度国家研究生奖学金.md',
      '实验室研究生荣获研究生2020年度国家研究生奖学金.md',
      '实验室研究生荣获研究生2020年度国家研究生奖学金.md',
    ];
    const expect = [
      {
        content: '\n' +
          '实验室长期招收硕士研究生(科学及专业学位)和有研究兴趣的本科生：\n' +
          '\n' +
          '如果您对计算机网络，特别是云计算、数据中心网络、软件定义网络（SDN）、网络虚拟化、网络拥塞控制等方向的学术研究和系统应用等感兴趣，希望攻读硕士学位，并具有一定的编程能力和英文阅读写作能力，欢迎随时和我们联系！欢迎推免研究生联系！\n' +
          '\n' +
          '我们与国外研究小组有长期联系，优秀学生可以推荐出国攻读博士学位（如英国等地高校）。\n' +
          '\n' +
          '具体信息请见：https://antlab.jnu.edu.cn/cuilin/join\n' +
          '\n' +
          '联系方式：tcuilin@jnu.edu.cn / cuilincui@gmail.com\n',
        date: '2019-08-12',
        title: '【招生】实验室长期招收硕士研究生和有研究兴趣的本科生',
        top: true,
      },
      {
        content: '\n实验室研究生林晋霆同学，荣获2020年度国家研究生奖学金。林晋霆同学读研期间，在COMNET（Computer Network，CCF B类）期刊上发表论文《Extensive Evaluation on the Performance and Behaviour of TCP Congestion Control Protocols under Varied Network Scenarios》。\n',
        date: '2019-12-12',
        title: '实验室研究生荣获研究生2020年度国家研究生奖学金',
        top: false,
      },
      {
        content: '\n实验室硕士生张羽翔等人撰写的论文《Mystique: A Fine-grained and Transparent Congestion Control Enforcement Scheme》被IEEE出版社的国际学术期刊《IEEE Transactions on Network and Service Management》录用。论文将于2020年正式发表。\n',
        date: '2019-09-09',
        title: '实验室硕士生张羽翔的论文被国际期刊IEEE Transactions on Network and Service Management录用',
        top: false,
      },
      {
        content: '\n实验室硕士生林晋霆的论文被国际期刊Computer Networks录用\n',
        date: '2019-09-08',
        title: '实验室硕士生林晋霆的论文被国际期刊Computer Networks录用',
        top: false,
      },
      {
        content: '\n实验室研究生张媛，因在2017~2018学年发表1篇期刊论文和2篇会议论文，荣获2019年研究生国家奖学金。\n',
        date: '2019-08-12',
        title: '实验室研究生荣获研究生2019年度国家研究生奖学金',
        top: false,
      },
    ];
    const actual = converter.buildFileObjectList('./markdown/announcements/');
    assert.deepStrictEqual(actual, expect);
  });
});
