// https://github.com/Microsoft/TypeScript-Babel-Starter
const path = require('path');

module.exports = {
  // Change to your "entry-point".
  entry: './src/ts/main.ts',
  devtool: 'inline-source-map',
  mode: 'development', //, 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'theme/assets/')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        // Include ts, tsx, and js files.
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      },
    ],
  }
};