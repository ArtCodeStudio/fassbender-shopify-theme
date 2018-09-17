(function () {
  'use strict';
}());

const gulp          = require('gulp');
const gutil         = require('gulp-util');
const pjson         = require('./package.json');
const zip           = require('gulp-zip');
const jsoncombine   = require('gulp-jsoncombine');

// list of settings files to include, in order of inclusion
var settingsSchemas = [
  'theme_info',
  'general',
  'home',
];

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
    'theme/sections/*',
    'theme/snippets/*',
    'theme/templates/*',
    'theme/templates/customers/*'
  ];

  return gulp.src(theme, {base: "."})
    .pipe(zip(pjson.name + '-' + pjson.version + '.zip'))
    .pipe(gulp.dest('./'));
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