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
var child = require('child_process');
var plugins = require('gulp-load-plugins')();

var mainBowerFiles = require('main-bower-files');

gulp.task('bower-js', function() {
  return gulp.src(mainBowerFiles())
    .pipe(plugins.filter('*.js'))
    .pipe(plugins.print())
    .pipe(gulp.dest('src/web/js'));
});

gulp.task('bower-css', function() {
  return gulp.src(mainBowerFiles())
    .pipe(plugins.filter(['*.css', '*.css.map']))
    .pipe(plugins.print())
    .pipe(gulp.dest('src/web/css'));
});

gulp.task('bower', ['bower-js', 'bower-css']);

gulp.task('html', function() { });

gulp.task('css', function() {
  return gulp.src('src/less/*.less')
    .pipe(plugins.print())
    .pipe(plugins.less())
    .pipe(gulp.dest('src/web/css'));
});

gulp.task('js', function() { });

gulp.task('watch', ['bower', 'images', 'css'], function() {
  gulp.watch('src/less/*.less', ['css']);
  child.spawn('pub', ['serve'], { cwd: process.cwd() + '/src', stdio: 'inherit' });
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*.{png,gif}')
    .pipe(plugins.print())
    .pipe(gulp.dest('src/web/images'));
});

gulp.task('default', ['bower', 'html', 'css', 'js', 'images']);

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

gulp.task('optimized_images', function() {
  return gulp.src('src/images/**/*.{jpg,gif}')
    .pipe(plugins.imagemin())
    .pipe(cachebust.resources())
    .pipe(plugins.print())
    .pipe(gulp.dest('dist/images'));
});

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

gulp.task('dart', function() {
  child.spawn('pub', ['build'], { cwd: process.cwd() + '/src', stdio: 'inherit' });
});

var runSequence = require('run-sequence');
gulp.task('dist', function(done) {
  runSequence('default', 'dart', 'optimized_images', 'styles', 'scripts', 'content', done);
});
