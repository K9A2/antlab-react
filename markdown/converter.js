const yaml = require('yaml-front-matter');
const fs = require('fs');

const monthString = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jnu', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * 获取 rootPath 下的所有子目录名字
 *
 * @param {string} rootPath 求子目录时的父目录
 */
exports.getTheNameOfAllChildFolders = function(rootPath) {
  const folders = [];
  const files = fs.readdirSync(rootPath);
  files.forEach(function(item) {
    if (fs.lstatSync(rootPath + item).isDirectory() === true) {
      folders.push(item);
    }
  });
  return folders;
};

/**
 * 获取 parentDirPath 下所有的文件名
 *
 * @param {string} parentDirPath 目标文件夹路径
 * @return 该文件夹的所有文件的文件名数组
 */
exports.getTheNameOfAllFiles = function(parentDirPath) {
  const fileNames = [];
  const parentDir = fs.readdirSync(parentDirPath);
  parentDir.forEach(function(item) {
    if (fs.lstatSync(parentDirPath + item).isFile()) {
      fileNames.push(item);
    }
  });
  return fileNames;
};

/**
 * 以  UTF-8 方式读取带 YAML 头的 Markdown 源文件
 *
 * @param {string} filePath Markdown 源文件路径
 * @returns {object} 解析 YAML 头之后的 Markdown 源文件
 */
exports.loadMarkdownFile = function(filePath) {
  // YAML 头信息会放在返回值的 '_content' 字段中
  const yamlLoadedFile = yaml.loadFront(fs.readFileSync(filePath, 'utf-8'));

  // parse the date into formatted time string
  const postDate = `${yamlLoadedFile.date}`;
  const dateParts = postDate.split(' ');
  const year = `${dateParts[3]}`;
  let month = monthString.indexOf(dateParts[1]) + 1;
  const day = `${dateParts[2]}`;

  if (month < 10) {
    month = `0${month}`;
  } else {
    month = `${month}`;
  }

  // remove the first line break character ('\n')
  let markdownContent = yamlLoadedFile.__content;
  markdownContent = markdownContent.replace(/\n/, '');

  return {
    title: yamlLoadedFile.title,
    top: yamlLoadedFile.top,
    date: `${year}-${month}-${day}`,
    content: markdownContent,
  };
};

/**
 * 从文件名列表中过滤出指定扩展名的文件
 *
 * @param {object} fileNameList 文件名列表
 * @param extName 目标文件的扩展名
 * @return 只包含指定扩展名的文件名列表
 */
exports.filterOutFileNamesByExtName = function(fileNameList, extName) {
  const markdownFileNames = [];
  fileNameList.forEach(function(fileName) {
    const lastIndexOfDot = fileName.lastIndexOf('.');
    if (lastIndexOfDot === -1) {
      // 该文件没有扩展名，不是 Markdown 源文件
      return;
    }
    const ext = fileName.substring(lastIndexOfDot, fileName.length);
    if (ext !== extName) {
      // 该文件的扩展名不是 '.md'，不是 Markdown 源文件
      return;
    }
    markdownFileNames.push(fileName);
  });
  return markdownFileNames;
};

/**
 * 按照对象的日期属性进行排序，排序功能依赖于待比较对象的 'date' 属性。
 * 结果按照从现在到过去的顺序排列。
 *
 * @param {object} firstElement 第一个待比较的元素
 * @param {object} secondElement 第二个待比较的元素
 * @return {number} 比较结果
 */
exports.sortByDate = function(firstElement, secondElement) {
  const dateOne = new Date(firstElement.date);
  const dateTwo = new Date(secondElement.date);
  return -(dateOne - dateTwo);
};

/**
 * 加载指定目录下的所有 Markdown 源文件、解析文件并排序
 *
 * @param filePath 存放 Markdown 文件的文件夹路径
 * @return {object} 返回一个包含该文件夹下所有解析过后的 Markdown 文件的列表，
 *                  先按照是否置顶排序，然后按照日期先后排序
 */
exports.buildFileObjectList = function(filePath) {
  const topPosts = []; // 置顶的文章
  const nonTopPosts = []; // 非置顶的文章

  // 读取所有 Markdown 源文件的文件名
  const markdownFileNames = module.exports.filterOutFileNamesByExtName(
    module.exports.getTheNameOfAllFiles(filePath), '.md'
  );

  // 读取并解析 Markdown 文件对象
  const markdownFileList = [];
  markdownFileNames.forEach(function(fileName) {
    markdownFileList.push(
      module.exports.loadMarkdownFile(filePath + fileName)
    );
  });

  // 先按照是否指定分类，然后在两个分类之间按照发表时间排序
  markdownFileList.forEach(function(fileItem) {
    if (fileItem.top === true) {
      topPosts.push(fileItem);
      return;
    }
    nonTopPosts.push(fileItem);
  });
  topPosts.sort(module.exports.sortByDate);
  nonTopPosts.sort(module.exports.sortByDate);

  const result = [];
  result.push(...topPosts);
  result.push(...nonTopPosts);
  return result;
};

/**
 * 解析形如 2019-01-01 这样的日期字符串，并返回日期对象
 *
 * @param {string} timeString 待解析的日期字符串
 * @return {object} 包含年月日（year，month 和 day）的对象
 */
exports.parseTimeStringIntoDateObject = function(timeString) {
  const params = timeString.split('-');
  return {
    year: params[0],
    month: params[1],
    day: params[2],
  };
};
