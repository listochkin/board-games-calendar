var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    gulp.src('./static/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./static/css'));
});

gulp.task('jshint', function() {
    gulp.src([
        './**/*.js',
        '!./node_modules/**/*',
        '!./coverage/**/*'
    ])
    .pipe(jshint())
    .pipe(plumber())
    .pipe(jshint.reporter());
});

gulp.task('server', function() {
    connect.server({
        port: 3000
    });
});

gulp.task('watch-sass', function() {
    gulp.watch([
        './**/*.scss',
        '!./node_modules/**/*'
    ], ['sass']);
});

gulp.task('watch-js', function() {
    gulp.watch([
        './**/*.js',
        '!./node_modules/**/*',
        '!./coverage/**/*'
    ], ['jshint']);
});

gulp.task('test', ['jshint']);

gulp.task('default', ['jshint', 'sass', 'watch-sass', 'watch-js', 'server']);
