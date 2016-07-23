// Assigning modules to local variables
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sasslint = require('gulp-sass-lint'),
    cssmin = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer'),
    header = require('gulp-header'),
    rename = require("gulp-rename"),
    pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * Bootstrap Solarized - Official Website (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author.name %>\n',
    ' * Licensed under <%= pkg.license %>\n',
    ' */\n',
    ''
].join('');

// Sass task to compile the sass files and add the banner
gulp.task('sass', function() {
    return gulp
      .src('./sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(header(banner, { pkg: pkg }))
      .pipe(gulp.dest('dist/css'));
});

// Minify CSS
gulp.task('minify', ['sass'], function() {
    return gulp
      .src(['./dist/css/*.css','!./dist/css/*.min.css'])
      .pipe(rename({ suffix: '.min' }))
      .pipe(autoprefixer())
      .pipe(cssmin())
      .pipe(gulp.dest('dist/css'))
});

// Lint SASS
gulp.task('lint', function () {
    return gulp
      .src('sass/**/*.s+(a|c)ss')
      .pipe(sasslint())
      .pipe(sasslint.format())
      .pipe(sasslint.failOnError())
});

// Watch task monitors SASS files
gulp.task('watch', function() {
    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('dist/css/*.css', ['minify']);
});

// Default task
gulp.task('default', ['sass', 'minify']);
