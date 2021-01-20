const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        vendors: [
            'lodash',
            'react',
            'prop-types',
            'react-color',
            'react-dom',
            'react-redux',
            'react-router',
            'react-router-dom',
            'react-router-redux',
            'redux',
            'redux-thunk',
            'redux-promise'
        ]
    },
    mode: 'development',
    devtool: 'source-map',
    output: {
        filename: 'vendors.dll.js',
        path: path.resolve(__dirname, '../dist/dll')
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            name: 'bundle.dll',
            path: path.join(__dirname, '../dist/dll', 'vendors.mainfest.json')
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
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
        ]
    }
}
