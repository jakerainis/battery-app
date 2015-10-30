'use strict';

var config = require('../config').markup;
var gulp = require('gulp');
var gulpFilter = require('gulp-filter');
var include = require('gulp-include');

gulp.task('markup', function() {
  var ignoreIncludes = gulpFilter(['*', '!includes'], {
    restore: true
  });
  return gulp.src(config.src)
    .pipe(include())
    .pipe(ignoreIncludes)
    .pipe(gulp.dest(config.dest));
});
