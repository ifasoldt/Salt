module.exports = {
  entry: {
    eventsIndex: './js/events/index.js',
    showEvent: './js/events/showEvent.js'
  },
  output: {
    path: './js/events',
    publicPath: '/js/events',
    filename: '[name].bundle.js',
  },
  devServer: {
    inline: true,
    port: 8000,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
