const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //一个入口文件
  // entry: path.resolve(__dirname, './src/index.js'),
  //
  entry: [path.resolve(__dirname, './src/index.js'), path.resolve(__dirname, './src/app.js')],
  //多页面应用程序
  /*entry: {
    page1: path.resolve(__dirname, './src/page1/entry.js'),
    page2: [path.resolve(__dirname, './src/page2/entry1.js'), path.resolve(__dirname, './src/page2/entry2.js'),],
  },*/
  output: {
    filename: 'js/[name]-[hash]-[id].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "www.pm.com"
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        fileName: 'index-[hash].html',
        inject: "body",
        title: "Webpack App",
        date: new Date(),
        minify:{
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
      }
    ),
  ],
  mode: "none",
};