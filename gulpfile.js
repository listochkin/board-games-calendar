var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    karma = require('karma').server,
    karmaRunner = require('karma').runner;

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

gulp.task('test-watch', function() {
  karma.start({
    configFile: __dirname + '/tests/karma-config.js',
  }, function(exitCode) {
    console.log('Karma has exited with ' + exitCode);
    process.exit(exitCode);
  });
});

gulp.task('tests-once', function() {
  karma.start({
    configFile: __dirname + '/tests/karma-config.js',
    singleRun: true,
    reporters: ['progress', 'coverage'],
    browsers: ['PhantomJS']
  }, function(exitCode) {
    console.log('Karma has exited with ' + exitCode);
    process.exit(exitCode);
  });
});

gulp.task('test', ['jshint', 'tests-once']);

gulp.task('default', ['jshint', 'sass', 'watch-sass', 'watch-js', 'server']);
