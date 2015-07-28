var path = require('path')
var webpack = require('webpack')
var WebpackErrorNotificationPlugin = require('webpack-error-notification')

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new WebpackErrorNotificationPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: true,
      __DEVTOOLS__: true  // <-- Toggle redux-devtools
    })
  ],
  resolve: {
    alias: {
      'redbox-react': path.join(__dirname, '..', '..', 'src')
    },
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot?errorReporter=redbox-react', 'babel'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, '..', '..', 'src')
    }, {
      test: /\.css?$/,
      loader: 'style-loader!css-loader?sourceMap&modules&localIdentName=[path][name]---[local]---[hash:base64:5]'
    }]
  }
}
