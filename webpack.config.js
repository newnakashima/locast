var path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  // filename: "[name].[contenthash].css"
  filename: "style.css"
  // ,disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: './webpack_build/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'out/dist')
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
