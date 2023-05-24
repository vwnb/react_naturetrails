const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    entry: {
      app: "./src/index.tsx"
    },

    output: {
      filename: "bundle.js",
    },
  
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    devServer: {
      static: {
        directory: path.join(__dirname, '/')
      },
      hot: true,
    },
  
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement',
        template: 'index.html',
        filename: 'index.html',
        inject: 'body'
      })
    ],
  
    module: {
      rules: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
          { test: /\.tsx?$/, loader: "ts-loader" },
      ],
    },
    mode: 'development'
  }