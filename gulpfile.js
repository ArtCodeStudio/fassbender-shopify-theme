(function () {
  'use strict';
}());

const gulp          = require('gulp');
const gutil         = require('gulp-util');
const plumber       = require('gulp-plumber');
const argv          = require('yargs').argv;
const concat        = require('gulp-concat');
const pjson         = require('./package.json');
const zip           = require('gulp-zip');
const SassImport    = require('./utils/sass_import.js');
const sass          = require('gulp-sass');
const jsoncombine   = require('gulp-jsoncombine');
const fs            = require('fs');
const util          = require('util');
const uglify        = require('gulp-uglify');
const rename        = require("gulp-rename");
const sourcemaps    = require('gulp-sourcemaps');
const browserify    = require('browserify');
const source        = require('vinyl-source-stream');
const tsify         = require('tsify');
const watchify      = require('watchify');
const buffer        = require('vinyl-buffer');
const autoprefixer  = require('gulp-autoprefixer');
const shell         = require('gulp-shell');
const ts            = require('gulp-typescript');
const tsProject     = ts.createProject('tsconfig.json');
const parcel        = require('gulp-parcel');
const webpack       = require('webpack');
const gulpWebpack   = require('webpack-stream');
const webpackTSLoaderConfig = require('./webpack.config.ts-loader');
const webpackConfig = require('./webpack.config');

// list of settings files to include, in order of inclusion
var settingsSchemas = [
  'bootstrap',
  'general',
  'barba',
  'navbar',
  'footer',
  'home',
  'about',
  'list-collections',
  'collection',
  'apps',
  'notifications',
  // 'customers',
];

var browserfyConfig = {
  basedir: '.',
  debug: true,
  entries: ['src/ts/main.ts'],
  cache: {},
  packageCache: {}
};

var watchedBrowserify = watchify(browserify(browserfyConfig).plugin(tsify));

var watchBrowserify = function() {
  return watchedBrowserify
  .transform('babelify', {extensions: ['.ts']})
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  // .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./theme/assets/'));
};
watchedBrowserify.on('update', watchBrowserify);
watchedBrowserify.on('log', gutil.log);

// Basic error messages output to the console.
// Used with plumber so we don't stop the other tasks from running or kill the gulp process on an error
var onError = function (err) {
  gutil.beep();
  gutil.log(gutil.colors.red(err));
};
 
/**
 * Cretae a zipped file of the theme that can be uploaded to Shopify
 */
gulp.task('zip', function () {
  var theme = [
    'theme/assets/*',
    'theme/config/*',
    'theme/layout/*',
    'theme/locales/*',
    'theme/snippets/*',
    'theme/templates/*',
    'theme/templates/customers/*'
  ];

  return gulp.src(theme, {base: "."})
    .pipe(zip(pjson.name + '-' + pjson.version + '.zip'))
    .pipe(gulp.dest('./'));
});

/**
 * Build typescript files to bundle.js with browserify and babelify
 */
gulp.task('build:ts:browserify', function() {
  return browserify(browserfyConfig)
  .plugin(tsify)
  .transform('babelify', {extensions: ['.ts']})
  .bundle()
  .on('error', onError)
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./theme/assets/'));
});

/**
 * Build typescript files to bundle.js with parcel.js
 */
gulp.task('build:ts:parcel', function() {
  return shell.task('parcel build ./src/ts/main.ts --out-dir theme/assets --out-file bundle.js');
});

/** 
 * Use TypeScript Compiler for type check
 */
gulp.task('build:ts:typecheck', shell.task('npm run type-check'));

/** 
 * Use TypeScript Compiler for type check
 */
gulp.task('watch:ts:typecheck', shell.task('npm run type-check -- --watch'));


/**
 * Uses Babel to build TypeScript
 * @see https://github.com/Microsoft/TypeScript-Babel-Starter
 */
gulp.task('build:ts:webpack', gulp.series(['build:ts:typecheck', function() {
  return gulp.src('src/ts/main.ts')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest('./theme/assets/'));
}]));

gulp.task('build:ts:webpack:tsloader', gulp.series(['build:ts:typecheck', function() {
  return gulp.src('src/ts/main.ts')
    .pipe(gulpWebpack(webpackTSLoaderConfig, webpack))
    .pipe(gulp.dest('./theme/assets/'));
}]));


/**
 * Build scss files to css
 */
gulp.task('build:scss', function () {

  var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
  };

  return gulp
    // Find all `.scss` files from the `stylesheets/` folder
    .src('./src/scss/theme.scss')
    // .pipe(sourcemaps.init())
    // Run Sass on those files
    .pipe(sass(sassOptions).on('error', onError))
    // .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest('./theme/assets/'));
});

/**
 * Create settings_schema.json
 */
gulp.task('theme_settings', function () {
  return gulp.src('./settings_schema/*.json')
    .pipe(jsoncombine('settings_schema.json',function(data){
      var data_array = [];
      // collect the json data and store it in the correct order
      for (var i = 0; i < settingsSchemas.length; i++) {
        var file = settingsSchemas[i];
        data_array.push(data[file]);
      }
      return new Buffer(JSON.stringify(data_array, null, 2));
    }))
    .pipe(gulp.dest('./theme/config/'));
});

gulp.task('watch:scss', function () {
  // watch for sass changes
  return gulp.watch([
    './src/scss/**/*.scss.liquid',
    './src/scss/**/*.scss',
    './src/ts/**/*.scss'
  ], gulp.parallel(['build:scss']));
});

gulp.task('watch:ts:browserify', watchBrowserify);

/**
 * Uses Babel to build TypeScript
 * @see https://github.com/Microsoft/TypeScript-Babel-Starter
 */
gulp.task('watch:ts:webpack', gulp.parallel(['watch:ts:typecheck', function() {
  var webpackWatchConfig = webpackConfig;
  webpackWatchConfig.watch = true;
  return gulp.src('src/ts/main.ts')
    .pipe(gulpWebpack(webpackWatchConfig, webpack))
    .pipe(gulp.dest('./theme/assets/'));
}]));

gulp.task('watch:ts:webpack:tsloader', gulp.parallel(['watch:ts:typecheck', function() {
  var webpackWatchConfig = webpackTSLoaderConfig;
  webpackWatchConfig.watch = true;
  return gulp.src('src/ts/main.ts')
    .pipe(gulpWebpack(webpackWatchConfig, webpack))
    .pipe(gulp.dest('./theme/assets/'));
  }]));


gulp.task('watch:ts:parcel', shell.task('parcel watch ./src/ts/main.ts --out-dir theme/assets --out-file bundle.js --hmr-hostname localhost'));

gulp.task('build:scss', gulp.parallel(['build:scss', 'build:scss']));

gulp.task('watch:theme', gulp.parallel(shell.task('cd ./theme; theme watch --force')));

gulp.task('watch', gulp.parallel(['watch:scss', 'watch:ts:webpack', 'watch:theme']));

gulp.task('build', gulp.parallel(['build:scss', 'build:ts:webpack']));

gulp.task('default', gulp.parallel(['watch']));