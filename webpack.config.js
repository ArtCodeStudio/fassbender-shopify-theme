// https://github.com/Microsoft/TypeScript-Babel-Starter
// https://florianbrinkmann.com/4849/sass-webpack/
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: true,
          mangle: true,
          output: {
            beautify: false,
            comments: false,
          }
        }
      })
    ]
  },
  // Change to your "entry-point".
  entry: ['./src/ts/main.ts', './src/scss/theme.scss' ],
  // devtool: 'inline-source-map',
  mode: 'production', //, 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'theme/assets/')
  },
  resolve: {
    modules: [ 'node_modules', 'src/modules' ],
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      // typescritpt and javascript
      {
        test: /\.(tsx?)|(js)$/,
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