/*eslint-env node */

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
        loader: 'babel'
      }
    ]
  }
}
