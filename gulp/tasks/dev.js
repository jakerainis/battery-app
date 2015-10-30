'use strict';

var gulp = require('gulp');

gulp.task('dev', ['webpack:build-dev', 'sass', 'images', 'markup', 'copy']);
