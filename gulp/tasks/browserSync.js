'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var config = require('../config.js').browserSync;

gulp.task('browserSync', ['dev'], function() {
  browserSync(config);
});

gulp.task('browserSync:dist', ['build'], function() {
  browserSync(config);
});
