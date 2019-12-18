let yaml = require('yaml-front-matter');
let fs = require('fs');

/**
 * 以  UTF-8 方式读取带 YAML 头的 Markdown 源文件
 *
 * @param filePath Markdown 源文件路径
 * @returns {{}} 解析 YAML 头之后的 Markdown 源文件
 */
function loadMarkdownFile(filePath) {
  // YAML 头信息会放在返回值的 '_content' 字段中
  return yaml.loadFront(fs.readFileSync(filePath, 'utf-8'));
}
