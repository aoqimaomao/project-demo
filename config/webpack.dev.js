const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

const dist = '/dist/';
module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: path.resolve(__dirname, '../src/index'),
  output: {
    path: path.resolve(__dirname, dist),
    filename: 'bundle.js',
    // publicPath: 'dist',
    chunkFilename: 'bundle.[hash:4].js'
  },
  devServer: {
    // proxy: { // proxy URLs to backend development server
    //   '/api': 'http://localhost:8087'
    // },
    contentBase: '../dist', // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    open: true,
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // host: 8087
    // ...
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
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
      // "process.env.NODE_ENV": JSON.stringify('process.env.NODE_ENV')
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
      template: './public/index.html',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin(({
      context: path.resolve(__dirname, '../dist'),
      manifest: path.resolve(__dirname, '../dist/dll', 'vendors.mainfest.json')
    }))
    // new OpenBrowserPlugin({
    //   url: `http://localhost:${PORT}/`,
    // }),
  ],
  // resolve
});