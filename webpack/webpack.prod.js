const common = require('./webpack.common.js')
const path = require('path')

const common_ = Object.assign({}, common, {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.js'),
  externals: {
    "react": "react",
    "react-dom": "react-dom",
  }
})

module.exports = [
  Object.assign({}, common_, {
    output: {
      filename: 'umd.min.js',
      path: path.resolve(__dirname, '../build'),
      libraryTarget: 'umd',
      library: 'Imitation',
      libraryExport: 'default'
    },
    optimization: {
      minimize: true
    }
  }),
  Object.assign({}, common_, {
    output: {
      filename: 'umd.js',
      path: path.resolve(__dirname, '../build'),
      libraryTarget: 'umd',
      library: 'Imitation',
      libraryExport: 'default'
    },
    optimization: {
      minimize: false
    }
  }),
  Object.assign({}, common_, {
    output: {
      filename: 'cmj.min.js',
      path: path.resolve(__dirname, '../build'),
      libraryTarget: 'commonjs'
    },
    optimization: {
      minimize: true
    }
  }),
  Object.assign({}, common_, {
    output: {
      filename: 'cmj.js',
      path: path.resolve(__dirname, '../build'),
      libraryTarget: 'commonjs'
    },
    optimization: {
      minimize: false
    }
  }),
]