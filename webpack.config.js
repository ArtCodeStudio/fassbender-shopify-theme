// https://github.com/Microsoft/TypeScript-Babel-Starter
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: true,
          mangle: {
            safari10: true, // https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/92
          },
          output: {
            beautify: false,
            comments: false,
          }
        }
      })
    ]
  },
  // Change to your "entry-point".
  entry: ['./src/ts/main.ts'],
  // devtool: 'inline-source-map',
  mode: 'production', // 'development', //'production', 
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
      }
    ]
  }
};