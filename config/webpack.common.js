const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.jsx',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  plugins: [
    // new BundleAnalyzerPlugin({analyzerPort: 8080}),
    new CompressionPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'test',
      template: path.resolve(__dirname, '../src/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      // 加载 js 和 jsx 文件
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
                '@babel/preset-env',
              ],
            },
          },
          {
            loader: 'eslint-loader',
            options: { fix: true },
          },
        ],
        exclude: '/node_modules/',
      },
      // 加载 css 文件
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // 加载 less 文件
      // { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      // 加载图片文件
      { test: /\.(png|svg|jpg|git)/, use: ['file-loader'] },
      // 加载字体文件
      { test: /\.(woff|woff2|eot|ttf|otf)/, use: ['file-loader'] },
    ],
  },
};
