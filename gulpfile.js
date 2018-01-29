var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var child = require('child_process');
var gutil = require('gulp-util');

// Directory setup
var srcDir = '_assets/';
var destDir = 'assets/';

// CSS compiling
gulp.task('css', function() {
  return gulp.src(srcDir + 'css/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest(destDir + 'css/'))
});

// JS compiling
gulp.task('js', function() {
  return gulp.src(srcDir + 'js/**/*.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(destDir + 'js/'))
});

// Image optimization
gulp.task('img', function() {
  return gulp.src(srcDir + 'images/**/*.{png,jpg,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest(destDir + 'images/'))
});

// Jekyll already handles html building, watching, and serving.
// It makes more sense to let it do its thing as a child process.
// @credit https://aaronlasseigne.com/2016/02/03/using-gulp-with-jekyll/
gulp.task('jekyll', function() {
  var jekyll = child.spawn('jekyll', ['serve']);

  var jekyllLogger = function(buffer) {
    buffer.toString().split(/\n/).forEach(function(message) {
      gutil.log(message)
    });
  }

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

// Putting it all together
gulp.task('default', ['css', 'js', 'img', 'jekyll'], function() {
  gulp.watch(srcDir + 'css/**/*.scss', ['css']);
  gulp.watch(srcDir + 'js/**/*.js', ['js']);
  gulp.watch(srcDir + 'images/**/*.{.png,jpg,gif}', ['img']);
})
