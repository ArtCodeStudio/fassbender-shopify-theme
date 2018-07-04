// https://github.com/Microsoft/TypeScript-Babel-Starter
const path = require('path');
const shell = require('shelljs');
const fs = require('fs');

const isSymlink = function(path) {
  const stats = fs.lstatSync(path);
  return stats.isSymbolicLink();
}

const copyModule = function (module) {
  shell.exec(`npm link ${module}`);
  const source = fs.realpathSync(path.resolve(__dirname, `./node_modules/${module}/src`));
  const target = path.resolve(__dirname, `./src/modules/${module}`);
  console.log(target, source);
  shell.rm('-rf', target);
  shell.cp('-R', source, target);
  console.log('done');
};

// Copy files from linked node modules otherwise they are not correctly transpiled by babel
// see https://github.com/kalisio/kdk/issues/28 for details
copyModule('tinybind');

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
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        // Include ts, tsx, and js files.
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        // exclude: path.resolve(__dirname, './node_modules/'),
        // include: fs.realpathSync(path.resolve(__dirname, './src/modules/tinybind')),
        // include: fs.realpathSync(path.resolve(__dirname, './node_modules/tinybind/src/')),
        // include: [
        //   path.resolve(__dirname, "src"),
        // ],
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