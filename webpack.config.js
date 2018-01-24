"use strict";

var CopyWebpackPlugin = require("copy-webpack-plugin");

let webpack = require("webpack");
let path = require("path");

let dev = path.resolve(__dirname, "app/dev");
let web = path.resolve(__dirname, "app/web");

let config = {
  entry: dev + "/index.js",
  output: {
    path: web,
    filename: "app.bundle.js"
  },
  module: {
    loaders: [
      {
        include: dev,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015", "stage-2"]
        }
      }
    ]
  },
  plugins: [new CopyWebpackPlugin([{ from: "app/dev/css", to: "css" }])],
  devServer: {
    historyApiFallback: true,
    contentBase: "./"
  }
};

module.exports = config;
