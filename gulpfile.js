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
let eslint = require('gulp-eslint');
let testSource = [
  'server/**/*.js',
  'client/**/*.js',
  '!client/lib/**',
  'test/**',
  '*.js',
  '!*.png',
  '!*.html',
  '!node_modules/**'
];
let tests = [
  'test/**/*.test.js',
  'test/server/users.test.js'
];

gulp.task('default', function(){
  gulp.watch(testSource, ['mocha', 'jshint']);
});

gulp.task('mocha', function(){
  return gulp.src(tests, { read: false })
  .pipe(mocha({ reporter: 'nyan' }))
  .on('error', gutil.log);
});

gulp.task('jshint', function() {
  return gulp.src(testSource)
  .pipe(jshint({
    //enforcing

    "undef": true,
    "unused": false,
    "node": true,
    "esversion": 6,
    "globals": {
      "require"    : false,
      "describe"   : false,
      "it"         : false,
      "before"     : false,
      "beforeEach" : false,
      "after"      : false,
      "afterEach"  : false,
      "nodemon"    : false,
      "angular"    : false
    },
  }))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('lint', function() {
  return gulp.src(testSource)
  .pipe(eslint({
    "env": {
      "browser": true,
      "node": true,
      "es6": true
    },

    "rules": {
      //"no-console": 1,
      "no-debugger": 1,
      "no-dupe-args": 1,
      "no-irregular-whitespace": 1,
      "no-extra-semi": 1,
      "dot-location": [1, "property"],
      "max-len": [1, 80]
    }
  }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});
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
  .pipe( notify({ message: "Javascript is now ugly!"}));

});

gulp.task('concat-dep', function() {
  return gulp.src(['bower_components/angular-animate/angular-animate.js', 
                  'bower_components/angular-cookies/angular-cookies.js',
                  'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
  ]).pipe(concat('scripts.js'))
  .pipe(gulp.dest('./client/scripts'));
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
  });
});

// TODO add concats 
//gulp.task('default', ['dev', 'build-js']) 
