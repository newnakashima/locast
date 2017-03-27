var path = require('path');

module.exports = {
  entry: './webpack_build/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'out/dist')
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
