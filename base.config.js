"use strict";
const path = require("path"), webpack = require("webpack"),
  ExtractTextWebpackPlugin = require("extract-text-webpack-plugin"),
  autoprefixer = require("autoprefixer")({browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"]});

function resolve(e) {
  return path.join(process.cwd(), e)
}

const src = resolve("src"), node_modules = resolve("node_modules"), modules = resolve("modules"),
  HappyPack = require("happypack"), happyThreadPool = HappyPack.ThreadPool({size: require("os").cpus().length});
module.exports = {
  output: {
    filename: "[name].[hash:6].js",
    path: resolve("build"),
    chunkFilename: "chunk/[chunkhash:6].js",
    publicPath: "/"
  },
  resolve: {
    modules: ["node_modules", src],
    extensions: [".js", ".jsx", ".scss", ".css"],
    alias: {"@": src, "#": modules, "~": node_modules}
  },
  plugins: [new ExtractTextWebpackPlugin(path.posix.join("static", "css/[name].[contenthash:6].css")), new webpack.optimize.CommonsChunkPlugin("vender"), new HappyPack({
    id: "js",
    threadPool: happyThreadPool,
    loaders: ["babel-loader"]
  })],
  module: {
    loaders: [{
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      use: [{
        loader: "@zd/zds-component-bundle/loader?lazy",
        options: {filter: /\?bundle/i}
      }, {loader: "happypack/loader?id=js"}]
    }, {
      test: /\.s[c|a]ss$/,
      include: resolve("src/pages"),
      use: [{loader: "style-loader/useable"}, {loader: "css-loader"}, {
        loader: "postcss-loader",
        options: {
          plugins: function () {
            return [autoprefixer]
          }
        }
      }, {loader: "sass-loader"}]
    }, {
      test: /\.s[c|a]ss$/,
      exclude: resolve("src/pages"),
      use: ExtractTextWebpackPlugin.extract({
        fallback: "style-loader",
        use: [{loader: "css-loader"}, {
          loader: "postcss-loader", options: {
            plugins: function () {
              return [autoprefixer]
            }
          }
        }, {loader: "sass-loader"}]
      })
    }, {
      test: /\.css$/,
      use: ExtractTextWebpackPlugin.extract({
        fallback: "style-loader",
        use: [{loader: "css-loader"}, {
          loader: "postcss-loader", options: {
            plugins: function () {
              return [autoprefixer]
            }
          }
        }]
      })
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: "url-loader",
      query: {limit: 1024, name: path.posix.join("static", "images/[hash:6].[ext]")}
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: "url-loader",
      query: {name: path.posix.join("static", "fonts/[hash:6].[ext]")}
    }]
  }
};