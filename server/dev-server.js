// const webpackDevServer = require('webpack-dev-server');
// const webpack = require('webpack');

// const config = require('./webpack.dev');
// const options = {
//   contentBase: '/dist/',
//   hot: true,
//   host: 'localhost',
//   historyApiFallback: true
// };

// webpackDevServer.addDevServerEntrypoints(config, options);
// const compiler = webpack(config);
// const server = new webpackDevServer(compiler, options);

// server.listen(5000, 'localhost', () => {
//   console.log('dev server listening on port 5000');
// });


const express = require('express')
const webpackDevMid = require('webpack-dev-middleware');
const webpackHotMid = require('webpack-hot-middleware')
const webpack = require('webpack');
const app = express();
const config = require('../config/webpack.dev');

// Object.keys(config.entry).forEach(function(name) {
//     config.entry[name] = ['webpack-hot-middleware/client?noinfo=true&reload=true'].concat(config.entry[name])
// })
const compiler = webpack(config)
app.use(webpackDevMid(compiler, {}))
app.use(webpackHotMid(compiler, {
    overlayStyles: true
}))
 
app.listen(8087);

console.log('process.env.NODE_ENV', JSON.stringify(process.env.NODE_ENV));