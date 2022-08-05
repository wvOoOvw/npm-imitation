const common = require('./webpack.common.js')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = Object.assign({}, common, {
  mode: 'development',
  entry: path.resolve(__dirname, '../@develop/index.js'),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../@develop/index.html')
    })
  ],
  devtool: 'inline-source-map'
})