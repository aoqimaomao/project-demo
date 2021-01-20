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


// const express = require('express')
// const webpackDevMid = require('webpack-dev-middleware');
// const webpackHotMid = require('webpack-hot-middleware')
// const webpack = require('webpack');
// const app = express();
// const config = require('../config/webpack.dev');

// // Object.keys(config.entry).forEach(function(name) {
// //     config.entry[name] = ['webpack-hot-middleware/client?noinfo=true&reload=true'].concat(config.entry[name])
// // })
// const compiler = webpack(config)
// app.use(webpackDevMid(compiler, {}))
// app.use(webpackHotMid(compiler, {
//     overlayStyles: true
// }))
 
// app.listen(8087);


var express = require('express'); //get the express module
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express(); //create a new instance of that class
var config = require('../config/webpack.dev');
var compiler = webpack(config);


app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));


// 使用静态资源目录，才能访问到/dist/index.html
app.use(express.static(config.output.path))

app.listen(8087, function () {
    // return console.log('Example app listening on port 3000!');
});
console.log('process.env.NODE_ENV', JSON.stringify(process.env.NODE_ENV));