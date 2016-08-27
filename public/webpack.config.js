module.exports = {
  entry: {
    eventsIndex: './js/events/index.js',
    showEvent: './js/events/showEvent.js',
    userDashboard: './js/dashboard/userDashboard.js',
    inbox: './js/components/inbox.js',
    MessageBox: './js/components/MessageBox.js'
  },
  output: {
    path: './js',
    publicPath: '/js',
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
