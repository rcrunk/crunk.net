/*
 * Copyright (c) 2015, Crunk Biz, LLC.
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE
 * FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY
 * DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER
 * IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING
 * OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var mainBowerFiles = require('main-bower-files');

var dart = true;

gulp.task('bower-js', function() {
  return gulp.src(mainBowerFiles())
    .pipe(plugins.filter('*.js'))
    .pipe(plugins.print())
    .pipe(gulp.dest(dart ? 'src/web/js' : 'src/js'));
});

gulp.task('bower-css', function() {
  return gulp.src(mainBowerFiles())
    .pipe(plugins.filter(['*.css', '*.css.map']))
    .pipe(plugins.print())
    .pipe(gulp.dest(dart ? 'src/web/css' : 'src/css'));
});

gulp.task('bower', ['bower-js', 'bower-css']);

gulp.task('html', function() { });

gulp.task('css', function() {
  return gulp.src('src/less/*.less')
    .pipe(plugins.print())
    .pipe(plugins.less())
    .pipe(gulp.dest(dart ? 'src/web/css' : 'src/css'));
});

var tsc = require('gulp-typescript');
var tscOptions = {
  target: 'ES5',
  module: 'commonjs',
  typescript: require('typescript'),
  reporter: tsc.reporter.nullReporter()
};

gulp.task('tsc', function () {
  if (!dart) {
    var tscResult = gulp.src('src/ts/*.ts')
        .pipe(plugins.print())
        .pipe(tsc(tscOptions));
    return tscResult.js.pipe(gulp.dest('src/js/'));
  }
});

gulp.task('js', ['tsc']);

gulp.task('watch', function() {
  gulp.watch('src/less/*.less', ['css']);
  if (!dart) gulp.watch('src/ts/*.ts', ['js']);
});

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

gulp.task('images', function() {
  if (dart) {
    return gulp.src('src/images/**/*.{png,gif}')
        .pipe(plugins.imagemin())
        .pipe(plugins.print())
        .pipe(gulp.dest('src/web/images'));
  }

  return gulp.src('src/images/**/*.{jpg,gif}')
      .pipe(plugins.imagemin())
      .pipe(cachebust.resources())
      .pipe(plugins.print())
      .pipe(gulp.dest('dist/images'));
});

gulp.task('default', ['bower', 'html', 'css', 'js', 'images']);

gulp.task('styles', function() {
  return gulp.src('src/css/**/*.css')
    .pipe(plugins.minifyCss())
    .pipe(cachebust.references())
    .pipe(plugins.print())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(plugins.uglify())
    .pipe(plugins.print())
    .pipe(cachebust.references())
    .pipe(plugins.print())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('content', function() {
  return gulp.src('src/**/*.html')
    .pipe(cachebust.references())
    .pipe(plugins.print())
    .pipe(gulp.dest('dist'));
});

var runSequence = require('run-sequence');
gulp.task('dist', function(done) {
  runSequence('default', 'images', 'styles', 'scripts', 'content', done);
});

gulp.task('dart', function() {

});