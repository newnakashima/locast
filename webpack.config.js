var path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  // filename: "[name].[contenthash].css"
  filename: "style.css"
  // ,disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    main: './assets/main.js',
    twitter: './assets/twitter.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'out/assets')
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: extractSass.extract({
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
          // includePaths: ["node_modules"]
          }
        }],
        fallback: "style-loader"
      })
    }]
  },
  plugins: [
    extractSass
  ],
  devServer: {
    port: 3000
  }
};
