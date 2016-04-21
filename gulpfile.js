let gulp = require('gulp'),
   gutil = require('gulp-util'),
  uglify = require('gulp-uglify'),
   watch = require('gulp-watch'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  jshint = require('gulp-jshint');









// get the server running
gulp.task('dev', function () {
  nodemon({
    script: 'server/server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  })
});


gulp.task('default', ['uglify', 'concat' ])
