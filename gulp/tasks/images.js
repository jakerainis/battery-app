'use strict';

var changed = require('gulp-changed');
var config = require('../config').images;
var gulp = require('gulp');
var gulpFilter = require('gulp-filter');
var imagemin = require('gulp-imagemin');
var imageminGifsicle = require('imagemin-gifsicle');
var imageminMozjpeg = require('imagemin-mozjpeg');
var imageminPngquant = require('imagemin-pngquant');
var imageminSvgo = require('imagemin-svgo');
var tinypng = require('gulp-tinypng-compress');


gulp.task('images', function() {
  var onlyPngs = gulpFilter(['**/*.png'], {
    restore: true
  });
  var ignorePngs = gulpFilter(['*', '!**/*.png'], {
    restore: true
  });
  return gulp.src(config.src)
    .pipe(changed(config.dest))
    .pipe(imageminMozjpeg({
      quality: 66
    })())
    .pipe(ignorePngs)
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      optimizationLevel: 7,
      multipass: true,
      use: [imageminPngquant(), imageminSvgo({
        precision: 1,
        plugins: [{
          cleanupNumericValues: {
            floatPrecision: 1
          }
        }]
      }), imageminGifsicle({
        interlaced: true
      })]
    }))
    .pipe(ignorePngs.restore)
    .pipe(onlyPngs)
    // run them through a plugin
    .pipe(tinypng({
      key: '5BnrJTev4UCEvOFhKmHsuguvBT3sqncl', //Jake
      // key: 'rO72aVZR6kl_Rn1xzjTFVrfQyWG6mrSA', //Salem
      checkSigs: true,
      sigFile: 'app/images/.tinypng-sigs',
      log: true
    }))
    // bring back the previously filtered out files (optional)
    .pipe(onlyPngs.restore)
    .pipe(gulp.dest(config.dest));
});
