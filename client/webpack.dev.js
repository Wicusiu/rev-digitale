const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common,{
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: './dist',
    publicPath: '/',
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
      __TEST__: JSON.stringify(process.env.TEST || false),
    }),
  ],
});
