'use strict';
let gulp   = require('gulp');
let mocha  = require('gulp-mocha');
let gutil  = require('gulp-util');
let uglify = require('gulp-uglify');
let watch  = require('gulp-watch');
let concat = require('gulp-concat');
let notify = require('gulp-notify');
let jshint = require('gulp-jshint');
let shell  = require('gulp-shell');
let babel  = require('gulp-babel');

gulp.task('default', function(){
  gulp.watch(['server/**', 'client/**', '*.js'], ['mocha']);
});

gulp.task('mocha', function(){
  return gulp.src(['test/**/*.test.js'], { read: false })
  .pipe(mocha({ reporter: 'nyan' }))
  .on('error', gutil.log);
})
// uncomment and fix when we have client-side up 
// uglify task
gulp.task('js', function() {

  // main app js file
  gulp.src('./change-me/js/app.js')
  .pipe(uglify())
  .pipe(concat("app.min.js"))
  .pipe(gulp.dest('./assets/js/'));

  // create 1 vendor.js file from all vendor plugin code
  gulp.src('./assets/js/vendor/**/*.js')
  .pipe(uglify())
  .pipe(concat("vendor.js"))
  .pipe(gulp.dest('./assets/js'))
  .pipe( notify({ message: "Javascript is now ugly!"}) );

});



gulp.task('concat-dep', function() {
  return gulp.src(['bower_components/angular-animate/angular-animate.js', 
                  'bower_components/angular-cookies/angular-cookies.js',
                  'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
  ]).pipe(concat('scripts.js'))
  .pipe(gulp.dest('./client/scripts'))
});

gulp.task('build-js', function() {
  return gulp.src(['']) // TODO fill me out
  .pipe(concat('')) // TODO fill me out
  .pipe(gulp.dest('./client/scripts'));
});

// get the server running
gulp.task('dev', function () {
  nodemon({
    script: 'server/server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  })
});

// TODO add concats 
//gulp.task('default', ['dev', 'build-js']) 
