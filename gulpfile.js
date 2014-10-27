var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber');

gulp.task('jshint', function() {
  gulp.src([
    './**/*.js',
    '!./node_modules/**/*.js',
    '!./static/assets/**/*.js',
    '!./coverage/**/*.js']
  )
  .pipe(jshint())
  .pipe(plumber())
  .pipe(jshint.reporter());
});

gulp.task('server', function() {
  connect.server({
    port: 3000
  });
});

gulp.task('test', ['jshint']);

gulp.task('default', ['jshint', 'server']);