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

gulp.task('images', function() {
  return gulp.src('src/images/**/*.{png,gif}')
    .pipe(plugins.print())
    .pipe(gulp.dest('src/web/images'));
});

gulp.task('css-lib', function() {
  return gulp.src('src/lib/**/*.less')
    .pipe(plugins.print())
    .pipe(plugins.less())
    .pipe(gulp.dest('src/lib'));
});

gulp.task('css-web', function() {
  return gulp.src('src/less/*.less')
    .pipe(plugins.print())
    .pipe(plugins.less())
    .pipe(gulp.dest('src/web/css'));
});

gulp.task('css', ['css-lib', 'css-web']);

gulp.task('watch', ['bower', 'images', 'css'], function() {
  gulp.watch('src/lib/**/*.less', ['css-lib']);
  gulp.watch('src/less/*.less', ['css-web']);
  child.spawn('pub', ['serve'], { cwd: process.cwd() + '/src', stdio: 'inherit' });
});

gulp.task('default', ['bower', 'images', 'css']);

gulp.task('optimize-images', function() {
  return gulp.src('src/build/web/**/*.{png,gif}')
    .pipe(plugins.imagemin())
    .pipe(plugins.print())
    .pipe(gulp.dest('dist'));
});

gulp.task('optimize-styles', function() {
  return gulp.src('src/build/web/**/*.css')
    .pipe(plugins.minifyCss())
    .pipe(plugins.print())
    .pipe(gulp.dest('dist'));
});

gulp.task('optimize-scripts', function() {
  return gulp.src('src/build/web/**/*.js')
    .pipe(plugins.uglify())
    .pipe(plugins.print())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['default'], function() {
  child.spawnSync('pub', ['build'], { cwd: process.cwd() + '/src', stdio: 'inherit' });
});

gulp.task('populate', function() {
  return gulp.src('src/build/web/**')
    .pipe(plugins.print())
    .pipe(gulp.dest('dist'));
});

gulp.task('optimize', ['optimize-images', 'optimize-styles', 'optimize-scripts']);

var runSequence = require('run-sequence');
gulp.task('dist', function(done) {
  runSequence('build', 'populate', 'optimize', done);
});

gulp.task('clean', function() {
  return gulp.src(['src/build', 'dist'], {read: false})
    .pipe(plugins.clean());
});

gulp.task('real-clean', ['clean'], function() {
  return gulp.src(['src/web/{css,images,js}', 'src/lib/**/*.css', 'src/**/packages', 'src/.pub'], {read: false})
    .pipe(plugins.print())
    .pipe(plugins.clean());
});

gulp.task('dist-clean', ['real-clean'], function() {
return gulp.src(['bower_components', 'node_modules'], {read: false})
    .pipe(plugins.print())
    .pipe(plugins.clean());
});
