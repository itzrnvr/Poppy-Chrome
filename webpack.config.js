const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { experiments } = require('webpack');

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    background: './src/core/background/background.js',
    content: './src/core/content/content.js',
    popup: './src/core/popup/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
    publicPath: '/',
  },

  module: {
    rules: [

      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        type: "javascript/esm"
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|json)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]'
        }
      }
    ],
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/manifest.json', to: 'manifest.json' },
        { from: 'src/assets/icons', to: 'icons' },
      ],
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'core', 'popup', 'popup.html'),
      filename: 'popup.html',
      cache: false,
    }),
  ],

  optimization: {
    minimize: false,
  },

};