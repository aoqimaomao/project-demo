const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dist = '../dist/';

module.exports = merge(common, {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index'),
  output: {
    path: path.resolve(__dirname, dist),
    filename: 'bundle.pro.js',
  },
  plugins: [
    // 定义环境变量为开发环境
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('development'),
    //   IS_DEVELOPMETN: true,
    // }),
      // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify('production')
      }
    }),
    // new webpack.DefinePlugin({
    //   PRODUCTION: JSON.stringify(false),
    //   VERSION: JSON.stringify('5fa3b9'),
    //   BROWSER_SUPPORTS_HTML5: true,
    //   TWO: '1+1',
    //   'typeof window': JSON.stringify('object'),
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    // }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin(({
      context: path.resolve(__dirname, '../dist'),
      manifest: path.resolve(__dirname, '../dist/dll', 'vendors.mainfest.json')
    }))
    // new OpenBrowserPlugin({
    //   url: `http://localhost:${PORT}/`,
    // }),
  ],
});