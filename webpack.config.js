/*eslint-env node */
var webpack = require('webpack')

module.exports = {
  entry: {
    app: './app'
  },
  output: {
    path: 'builds',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?stage=0'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(
      /* chunkName= */'vendor',
      /* filename= */'vendor.bundle.js'
    )
  ]
}
