const webpack = require('webpack');
const path = require('path');
const os = require('os');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const pkg = require('./package.json');

module.exports = {
  entry: {
    // vendor: ['babel-polyfill', 'react', 'react-dom', 'redux', 'whatwg-fetch'],
    // main: ['./src/app/web/index.tsx'],
    main: ['babel-polyfill', './src/app/web/index.tsx', 'whatwg-fetch'],
    styles: ['./assets/css/main.css', './assets/css/materialinear.css'],
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.svg'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src', 'components', 'business'),
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'src', 'components'),
    ],
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        include: path.resolve(__dirname, path.join('src')),
        exclude: [/node_modules/, /build/, '/\.cache-loader/'],
        use: [
          'cache-loader',
          {
            loader: 'thread-loader',
            options: {
              workers: os.cpus().length - 1,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
            }
          },
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader'
      },
      {
        test: /\.(jpe?g|gif|png)$/,
        use: 'file-loader?name=img/[name].[ext]',
      },
    ],
  },
  devServer: {
    contentBase: './dist',
    publicPath: '/',
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new HTMLWebpackPlugin({
      title: 'Up - (R)evolution Digitale',
      template: 'assets/index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true
    }),
  ]
};
