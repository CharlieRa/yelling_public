var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var mincss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

/* Webserver for development */
gulp.task('webserver', function() {
  gulp.src('client')
    .pipe(webserver({
      livereload: true,
      // directoryListing: true,
      open: true,
      host: 'localhost',
      port: 8000
    }));
});

/* Task para compilar .sass o .scss a .css*/
gulp.task('sass', function() {
   return gulp.src('client/src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(mincss({compatibility: 'ie8'}))
    .pipe(gulp.dest('client/dist/css'));
});

gulp.task('imgmin', function () {
    return gulp.src('client/src/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('client/dist/img'));
});

/* Task para minificar js */
// gulp.task('uglifyjs', function() {
//   return gulp.src('/*.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('client/dist/js'));
// });

gulp.task('default',['sass', 'imgmin', 'webserver']);
