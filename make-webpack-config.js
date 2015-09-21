'use strict'
// imports
var webpack = require('webpack')

module.exports = function(options){

  // base set of plugins, used in any configuration
  var plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(options.nodeEnv)
    })
  ]

  // production configuration
  if (options.minimize) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          screw_ie8: true,
          warnings: false
        }
      })
    )
  }

  return {
    module: {
      loaders: [{
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }]
    },
    externals: {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    output: {
      library: 'redbox',
      libraryTarget: 'umd'
    },
    plugins: plugins
  }
}
