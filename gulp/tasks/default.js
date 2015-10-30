var gulp = require('gulp');

gulp.task('default', ['watch']);

gulp.task('dist', ['browserSync:dist']);
