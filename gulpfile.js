const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const child = require('child_process');
const log = require('fancy-log');

// Directory setup
const srcDir = '_assets/';
const destDir = 'assets/';

// CSS compiling
const css = () =>
  gulp.src(srcDir + 'css/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest(destDir + 'css/'));

gulp.task('css', gulp.series(css));

// JS compiling
const js = () =>
  gulp.src(srcDir + 'js/**/*.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(destDir + 'js/'));

gulp.task('js', gulp.series(js));

// Image optimization
const img = () =>
  gulp.src(srcDir + 'images/**/*.{png,jpg,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest(destDir + 'images/'));

gulp.task('img', gulp.series(img));

// Jekyll already handles html building, watching, and serving.
// It makes more sense to let it do its thing as a child process.
// @credit https://aaronlasseigne.com/2016/02/03/using-gulp-with-jekyll/
const jekyll = () => {
  const jekyll = child.spawn('jekyll', ['serve']);

  const jekyllLogger = (buffer) => {
    buffer.toString().split(/\n/).forEach(function(message) {
      log(message);
    });
  }

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
}

// Putting it all together
const build = gulp.parallel(css, js, img);
const watch = () => {
  gulp.watch(srcDir + 'css/**/*.scss', css);
  gulp.watch(srcDir + 'js/**/*.js', js);
  gulp.watch(srcDir + 'images/**/*.{.png,jpg,gif}', img);
}

gulp.task('default', gulp.parallel(build, watch, jekyll));
