'use strict'

// imports
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// configurations
var TEST, PROD
if (process.env.TEST) {
  TEST = true
} else if (process.env.NODE_ENV === 'production') {
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
    preLoaders: [{
      test: /\.css?$/,
      loader: 'csslint',
      include: /stylesheets/
    }],
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

// Mutates config to use the ExtractTextPlugin to extract
// css instead of inlining it.
function extractCSS (config) {
  config.plugins.push(new ExtractTextPlugin('redbox.css', {allChunks: true}))

  config.module.loaders.push({
    test: /\.css?$/,
    loader: ExtractTextPlugin.extract('css-loader?modules&localIdentName=[hash:base64:5]')
  })
}

if (TEST) {
  extractCSS(config)
} else if (PROD) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  )
  extractCSS(config)
} else {
  config.module.loaders.push({
    test: /\.css?$/,
    loader: 'style-loader!css-loader?sourceMap&modules&localIdentName=[path][name]---[local]---[hash:base64:5]'
  })
}

module.exports = config
