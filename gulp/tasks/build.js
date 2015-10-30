var gulp = require('gulp');

gulp.task('build', ['webpack:build', 'sass', 'images', 'markup', 'copy']);
