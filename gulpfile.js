/*jslint node: true */

'use strict';

import { task, src, dest, watch, series } from 'gulp';
import { name, version } from './package.json';
import zip from 'gulp-zip';
import jsoncombine from 'gulp-jsoncombine';

// list of settings files to include, in order of inclusion
const settingsSchemas = [
  'theme_info',
  'general',
  'home',
];

const files = {
  zip: [
    'theme/assets/*',
    'theme/config/*',
    'theme/layout/*',
    'theme/locales/*',
    'theme/sections/*',
    'theme/snippets/*',
    'theme/templates/*',
    'theme/templates/customers/*'
  ],
  theme_settings: './settings_schema/*.json',
};
 
/**
 * Cretae a zipped file of the theme that can be uploaded to Shopify
 */
task('build:zip', () => {
  return src(files.zip, {base: "."})
    .pipe(zip(name + '-' + version + '.zip'))
    .pipe(dest('./'));
});

task('watch:zip', () => {
  return watch(files.zip, series('build:zip'));
});

/**
 * Create settings_schema.json
 */
task('build:theme_settings', () => {
  return src(files.theme_settings)
    .pipe(jsoncombine('settings_schema.json', (data) => {
      var data_array = [];
      // collect the json data and store it in the correct order
      for (var i = 0; i < settingsSchemas.length; i++) {
        var file = settingsSchemas[i];
        data_array.push(data[file]);
      }
      return new Buffer(JSON.stringify(data_array, null, 2));
    }))
    .pipe(dest('./theme/config/'));
});
