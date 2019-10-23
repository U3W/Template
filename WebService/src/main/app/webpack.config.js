const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

const appConfig = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  output: {
    path: path.resolve(__dirname, "build")
  }
};

const workerConfig = {
  entry: "./src/worker.js",
  target: "webworker",

  resolve: {
    extensions: [".js", ".wasm"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "worker.js"
  },
  mode: "development"
};

module.exports = [appConfig, workerConfig];