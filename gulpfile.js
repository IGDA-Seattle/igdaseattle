var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var dusthtml = require('gulp-dust-html');
var webserver = require('gulp-webserver');

// CSS compiling
gulp.task('css', function() {
  return gulp.src('css/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('css/'))
});

// JS compiling
gulp.task('js', function() {
  return gulp.src(['js/**/*.js', '!js/**/*.min.js'])
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
});

// HTML compiling
gulp.task('html', function () {
  return gulp.src('html/**/*.html')
   .pipe(dusthtml({basePath: 'html', config: {cache: false}}))
   .pipe(gulp.dest('./'));
});

// Localhost and live reload
gulp.task('webserver', function() {
  return gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

// Putting it all together
gulp.task('default', ['css', 'js', 'html', 'webserver'], function() {
  gulp.watch('css/**/*.scss', ['css']);
  gulp.watch(['js/**/*.js', '!js/**/*.min.js'], ['js']);
  gulp.watch(['html/**/*.html', 'html/**/*.dust'], ['html']);
})
