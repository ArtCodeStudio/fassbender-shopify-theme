
const path = require('path');
const shell = require('shelljs');
const fs = require('fs');

const isSymlink = function(path) {
  const stats = fs.lstatSync(path);
  return stats.isSymbolicLink();
}

const copyModule = function (module) {
  shell.exec(`npm link ${module}`);
  const source = fs.realpathSync(path.resolve(__dirname, `./../node_modules/${module}/src`));
  const target = path.resolve(__dirname, `./../src/modules/${module}`);
  console.log(target, source);
  shell.rm('-rf', target);
  shell.cp('-R', source, target);
  console.log('done');
};

// Copy files from linked node modules otherwise they are not correctly transpiled by babel
// see https://github.com/kalisio/kdk/issues/28 for details
copyModule('tinybind');