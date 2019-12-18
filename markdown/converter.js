const yaml = require('yaml-front-matter');
const fs = require('fs');

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
 * @param filePath Markdown 源文件路径
 * @returns {{}} 解析 YAML 头之后的 Markdown 源文件
 */
exports.loadMarkdownFile = function(filePath) {
  // YAML 头信息会放在返回值的 '_content' 字段中
  return yaml.loadFront(fs.readFileSync(filePath, 'utf-8'));
};
