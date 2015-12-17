/*eslint-env node */

module.exports = {
  entry: {
    app: './app/server.js'
  },
  output: {
    path: 'builds',
    filename: 'server.js'
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
