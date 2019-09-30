// https://github.com/Microsoft/TypeScript-Babel-Starter
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

/**
 * output errors on watch
 * @see https://stackoverflow.com/a/39142422/1465919
 */
class ConsoleNotifierPlugin {
  compilationDone(stats) {
    const log = (error) => {
      console.error(error.error ? error.error : error);
    };
    stats.compilation.errors.forEach(log);
  }

  apply(compiler) {
    compiler.plugin('done', this.compilationDone.bind(this));
  }
}

module.exports = {
  optimization: {
    minimizer: [new TerserPlugin({
      sourceMap: false,
      terserOptions: {
        ecma: undefined,
        warnings: true,
        parse: {},
        compress: {},
        mangle: true, // Note `mangle.properties` is `false` by default.
        module: false,
        output: {
          comments: false,
        },
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: true,
      },
    })],
    splitChunks: {
      automaticNameDelimiter: '.',
      chunks: 'all'
    },
  },
  // Change to your "entry-point".
  entry: ['./src/ts/main.ts'],
  // devtool: 'inline-source-map',
  mode: 'production', // 'development', //'production', 
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'theme/assets/')
  },
  resolve: {
    modules: [ 'node_modules', 'src/modules' ],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    symlinks: true
  },
  module: {
    rules: [
      // typescript and javascript
      {
        test: /\.(tsx?)|\.(js)$/,
        exclude: [/node_modules\/(?!@ribajs)/, /(bower_components)/],
        loader: 'babel-loader',
        // include: []
        // include: [
        //   // /node_modules\/@ribajs\/*/,
        //   path.resolve(__dirname, "node_modules/@ribajs/core"),
        //   path.resolve(__dirname, "node_modules/@ribajs/router"),
        //   path.resolve(__dirname, "node_modules/@ribajs/shopify")
        // ]
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
  },
  plugins:  [new ConsoleNotifierPlugin()]
};