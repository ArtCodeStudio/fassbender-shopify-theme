// https://github.com/Microsoft/TypeScript-Babel-Starter
// https://florianbrinkmann.com/4849/sass-webpack/
const path = require('path');

module.exports = {
  // Change to your "entry-point".
  entry: ['./src/ts/main.ts', './src/scss/theme.scss' ],
  devtool: 'inline-source-map',
  mode: 'production', //, 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'theme/assets/')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      // typescritpt and javascript
      {
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // html templates
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      },
      // scss
      {
        test: /.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
              outputPath: '.'
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader',
            options: { minimize: true }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ],
  }
};