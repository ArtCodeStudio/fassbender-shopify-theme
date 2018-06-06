(function () {
  'use strict';
}());

var gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    plumber       = require('gulp-plumber'),
    argv          = require('yargs').argv,
    concat        = require('gulp-concat'),
    pjson         = require('./package.json'),
    zip           = require('gulp-zip'),
    SassImport    = require('./utils/sass_import.js'),
    sass          = require('gulp-sass'),
    jsoncombine   = require('gulp-jsoncombine'),
    fs            = require('fs'),
    util          = require('util'),
    uglify        = require('gulp-uglify'),
    rename        = require("gulp-rename"),
    sourcemaps    = require('gulp-sourcemaps'),
    browserify    = require('browserify'),
    source        = require('vinyl-source-stream'),
    tsify         = require('tsify'),
    gutil         = require('gulp-util'),
    watchify      = require('watchify'),
    buffer        = require('vinyl-buffer'),
    autoprefixer  = require('gulp-autoprefixer'),
    shell         = require('gulp-shell'),
    ts            = require('gulp-typescript'),
    tsProject     = ts.createProject('tsconfig.json');

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
  .transform('babelify', {
    presets: ['es2015'],
    extensions: ['.ts']
  })
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
 * Build typescript files to bundle.js
 */
gulp.task('typescript', function() {
  return browserify(browserfyConfig)
  .plugin(tsify)
  .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts']
  })
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
 * concat all dynamic scss files to let it build from shopify's scss implementation on the server
 * TODO use https://www.npmjs.com/package/gulp-shopify-sass
 */
gulp.task('sass-dynamic', function () {
  var paths = new SassImport('./src/scss/dynamic/theme.scss');
  console.log(paths);
  return gulp.src(paths)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat('theme.scss.liquid'))
    .pipe(gulp.dest('./theme/assets/'));
});

/**
 * Build scss files to css
 */
gulp.task('sass-static', function () {

  var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
  };

  return gulp
    // Find all `.scss` files from the `stylesheets/` folder
    .src('./src/scss/static/theme.scss')
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

gulp.task('watch-sass', function () {
  // watch for sass changes
  gulp.watch([
    './src/scss/**/*.scss.liquid',
    './src/scss/**/*.scss'
  ], ['sass']);
});

gulp.task('watch-typescript', watchBrowserify);

gulp.task('sass', ['sass-static', 'sass-dynamic']);

gulp.task('theme-watch', shell.task('cd ./theme; theme watch --force'));

gulp.task('watch', ['watch-sass', 'watch-typescript', 'theme-watch']);

gulp.task('build', ['sass', 'typescript']);

gulp.task('default', ['watch']);