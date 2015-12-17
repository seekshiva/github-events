/*eslint-env node */

module.exports = {
  entry: {
    app: './app/index.js'
  },
  output: {
    path: 'builds',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
}
