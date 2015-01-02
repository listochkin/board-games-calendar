var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    karma = require('karma').server,
    karmaRunner = require('karma').runner,
    forever = require('forever-monitor');

gulp.task('node-server-watch', function() {
    var child = new (forever.Monitor)('server.js', {
        max: 1,  
        sourceDir: 'server/',
        env: {'NODE_ENV': 'development'},
        watch: true,
        watchDirectory: 'server/'
    });

  child.on('exit', function () {
    console.log('server/server.js has exited');
  });

  child.start();
});

gulp.task('sass', function () {
    gulp.src('./client/static/assets/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./client/static/assets/css'));
});

gulp.task('jshint', function() {
    gulp.src([
        './**/*.js',
        '!./node_modules/**/*',
        '!./client/coverage/**/*',
        '!./client/static/bower_components/**/*'
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
        './client/**/*.scss',
        '!./node_modules/**/*',
        '!./client/static/bower_components/**/*'
    ], ['sass']);
});

gulp.task('watch-client-js', function() {
    gulp.watch([
        './**/*.js',
        '!./node_modules/**/*',
        '!./client/coverage/**/*',
        '!./client/static/bower_components/**/*'
    ], ['jshint']);
});

gulp.task('test-watch', function() {
  karma.start({
    configFile: __dirname + '/client/tests/karma-config.js',
  }, function(exitCode) {
    console.log('Karma has exited with ' + exitCode);
    process.exit(exitCode);
  });
});

gulp.task('tests-once', function() {
  karma.start({
    configFile: __dirname + '/client/tests/karma-config.js',
    singleRun: true,
    reporters: ['progress', 'coverage'],
    browsers: ['PhantomJS']
  }, function(exitCode) {
    console.log('Karma has exited with ' + exitCode);
    process.exit(exitCode);
  });
});

gulp.task('test', ['jshint', 'tests-once']);

gulp.task('default', ['jshint', 'sass', 'watch-sass', 'watch-client-js', 'node-server-watch']);
