'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('sass', function () {
    gulp.src('styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('styles'))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: {
            baseDir: '.'
        },
        open: false
    });

    gulp.watch('styles/*.scss', ['sass']).on('change', reload);
    gulp.watch(['*.html', 'scripts/*.js']).on('change', reload);
});

gulp.task('default', ['serve']);