'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = function makeWebpackConfig() {
  
  var config = {};
  
  config.entry = {
    app: './src/app/app.js'
  };

  config.output = {
    
    path: __dirname + '/dist',
    
    publicPath: 'http://localhost:8080/',
    
    filename: '[name].bundle.js',
  
  };

  config.module = {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [
          {loader: 'css-loader', query: {sourceMap: true}},
          {loader: 'postcss-loader'}
        ],
      })
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file-loader'
    }, {
      test: /\.html$/,
      loader: 'raw-loader'
    }]
  };

  config.plugins = [
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin({filename: 'css/[name].css', disable: true, allChunks: true}),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    })
  ];
  

  config.devServer = {
    contentBase: './src/public',
    stats: 'minimal'
  };

  return config;
}();
