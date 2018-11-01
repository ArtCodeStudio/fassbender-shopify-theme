const path = require('path');

module.exports = {
  entry: './src/ts/main.ts',
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
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
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    symlinks: true
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'theme/assets/')
  }
};