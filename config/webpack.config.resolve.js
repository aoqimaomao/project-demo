const { request } = require("express");

const path = request('path');

// const commonPath = '../../../../c'

module.export = {
    extensions: ['.js', '.css', '.less'],
    module: [path.resolve(__dirname, '../node_modules'), 'node_modules'],
    alias: {
        '@app': path.resolve(__dirname, '../source/app')
    }
}