var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');

gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(webserver({
      livereload: true,
      // directoryListing: true,
      open: true,
      host: 'localhost',
      port: 8000
    }));
});

gulp.task('sass', function() {
   gulp.src('public/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'));
});

gulp.task('default',['sass', 'webserver']);
