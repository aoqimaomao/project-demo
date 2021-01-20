// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// module.exports = {
//   entry: {
//     index: './src/index.js',
//     // print: './src/print.js',
//   },
//   output: {
//     filename: '[name].[contenthash].js',
//     path: path.resolve(__dirname, 'dist'),
//     publicPath: '/',
//     pathinfo: false,
//   },
//   mode: "development",
//   devtool: 'eval-cheap-module-source-map',
//   devServer: {
//     contentBase: './dist',
//     hot: true,
//     host: 'localhost',
//   },
//   optimization: {
//     // splitChunks: {
//     //   chunks: 'all',
//     // },
//     moduleIds: 'deterministic',
//     runtimeChunk: 'single',
//     splitChunks: {
//         cacheGroups: {
//           vendor: {
//             test: /[\\/]node_modules[\\/]/,
//             name: 'vendors',
//             chunks: 'all',
//           },
//         },
//       },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: ['style-loader', 'css-loader'],
//       },
//       {
//         test: /\.js$/,
//         include: path.resolve(__dirname, 'src'),
//         loader: 'babel-loader',
//       },
//       {
//         test: /\.(png|svg|jpg|jpeg|gif)$/i,
//         type: 'asset/resource',
//       },
//       {
//         test: /\.(woff|woff2|eot|ttf|otf)$/i,
//         type: 'asset/resource',
//       },
//       {
//         test: /\.(csv|tsv)$/i,
//         use: ['csv-loader'],
//       },
//       {
//         test: /\.xml$/i,
//         use: ['xml-loader'],
//       },
//     ],
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//         title: 'Development',
//     }),
//   ],
// };

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
 
  // optimization: {
  //   // splitChunks: {
  //   //   chunks: 'all',
  //   // },
  //   moduleIds: 'deterministic',
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //       cacheGroups: {
  //         vendor: {
  //           test: /[\\/]node_modules[\\/]/,
  //           name: 'vendors',
  //           chunks: 'all',
  //         },
  //       },
  //     },
  // },
  plugins: [
    // 对于 CleanWebpackPlugin 的 v2 versions 以下版本，使用 new CleanWebpackPlugin(['dist/*'])
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: process.env.NODE_ENV
      }

   })
  ],
  resolve: {
		// 要解析的文件的扩展名
        extensions: [".js", ".jsx", ".json"],
		// 解析目录时要使用的文件名
        mainFiles: ["index"],
    },
  module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.less$/,
            loader: "less-loader", // 将 Less 文件编译为 CSS 文件
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192
                }

              }
            ]
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  minetype: 'applicaton/font-woff'
                }
              }
            ]
          },
          {
            test: /\.(csv|tsv)$/i,
            use: ['csv-loader'],
          },
          {
            test: /\.xml$/i,
            use: ['xml-loader'],
          },
          {
            test: /\.js$/,
            exclude: "/node_modules/",
            use: ["babel-loader"]
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: 'babel-loader'
        },
        ],
      },
};