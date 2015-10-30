'use strict';

var gulp = require('gulp'),
  autoprefixer = require('autoprefixer'),
  browserSync = require('browser-sync'),
  compass = require('gulp-compass'),
  config = require('../config').compass,
  cssshrink = require('gulp-cssshrink'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  sourcemaps = require('gulp-sourcemaps');

var processors = [
  autoprefixer({
    browsers: '> 1%, last 4 versions',
    map: true
  })
];

gulp.task('sass', function() {
  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(compass(config.settings))
    .pipe(postcss(processors))
    .pipe(cssshrink())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});
