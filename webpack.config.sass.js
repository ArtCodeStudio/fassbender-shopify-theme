// https://github.com/Microsoft/TypeScript-Babel-Starter
// https://florianbrinkmann.com/4849/sass-webpack/
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ['./src/scss/theme.scss' ],
  // devtool: 'inline-source-map',
  mode: 'production', //, 'development',
  output: {
    filename: 'remove.js',
    path: path.resolve(__dirname, 'theme/assets/')
  },
  module: {
    rules: [
      // scss
      {
        test: /.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // removejavascript from style
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: { minimize: true }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css",
      // publicPath: path.resolve(__dirname, 'theme/assets/')
    })
  ]
};