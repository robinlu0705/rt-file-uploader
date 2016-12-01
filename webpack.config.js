'use strict';

var webpack = require('webpack');
var path = require('path');
var srcPath = path.join(__dirname, 'src');

module.exports = {  
  target: 'web',
  cache: true,
  bail: true,
  entry: {
    rt_file_uploader: [ path.join(srcPath, 'entry.js') ]
  },

  resolve: {
    root: srcPath,
    extensions: ['', '.js'],
    modulesDirectories: ['./node_modules', './']
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'rt_file_uploader'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
    ]
  }
};
