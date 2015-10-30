// 'use strict';
// // WORK IN PROGRESS
// var gulp = require('gulp');
// var ngrok = require('ngrok');
// var opts = {
//   proto: 'http', // http|tcp|tls
//   addr: 3000, // port or network address
// }
// var psi = require('psi');
// var portVal = 3020;
// var sequence = require('run-sequence');
// var site = '';
//
// gulp.task('ngrok-url', function(cb) {
//   return ngrok.connect(3000, function(err, url) {
//     site = url;
//     console.log(err, url);
//     console.log('serving your tunnel from: ' + site);
//     cb();
//   });
// });
//
// gulp.task('psi-desktop', function(cb) {
//   psi(site, {
//     nokey: 'true',
//     strategy: 'desktop'
//   }, cb);
// });
//
// gulp.task('psi-mobile', function(cb) {
//   psi(site, {
//     nokey: 'true',
//     strategy: 'mobile'
//   }, cb);
// });
//
// gulp.task('psi-seq', function(cb) {
//   return sequence(
//     'default', // name of your server task here
//     'ngrok-url',
//     'psi-desktop',
//     'psi-mobile',
//     cb
//   );
// });
//
// gulp.task('psi', ['psi-seq'], function() {
//   console.log('Woohoo! Check out your page speed scores!');
//   process.exit();
// });
