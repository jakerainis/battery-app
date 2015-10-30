'use strict';

var gulp = require('gulp');
var penthouse = require('penthouse');
var fs = require('fs');

gulp.task('penthouse', ['dist'], function() {
  return penthouse({
    url: ['http://localhost:3000'],
    css: 'build/styles/screen.css',
    width: 1280,
    height: 960
  }, function(err, critical) {
    fs.writeFile('app/includes/1_core/critical.html', '<style>' +
      critical + '</style>');
  });
});
