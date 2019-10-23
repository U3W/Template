const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebPackPlugin = require("copy-webpack-plugin");
const path = require('path');

// Configure React-App
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
    }),
    new CopyWebPackPlugin([
      { from: "public" }
    ])
  ],
  output: {
    path: path.resolve(__dirname, "build")
  }
};

// Configure WebWorker with WebAssembly
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