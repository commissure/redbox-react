'use strict'

// imports
var webpack = require('webpack')

// configurations
var PROD
if (process.env.NODE_ENV === 'production') {
  PROD = true
}

// base set of plugins, used in any configuration
var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]

let config = {
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }]
  },
  externals: {
    'react': 'react'
  },
  output: {
    library: 'redbox-react',
    libraryTarget: 'umd'
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js']
  }
}

if (PROD) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  )
}

module.exports = config
