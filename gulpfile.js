var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    cmq = require('gulp-combine-media-queries'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    critical = require('critical');

// load plugins
var $ = require('gulp-load-plugins')();

// Styles
gulp.task('styles', function() {
    return sass('src/sass', { style: 'expanded' })
    .pipe(gulp.dest('style'))
    .pipe(cmq({ log: false }))
    .pipe(gulp.dest('style'))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('style'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('style'))
    .pipe(notify({ message: 'Stylish' }));
});
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({ message: 'Images task complete' }));
});
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('scripts'))
    .pipe(notify({ message: 'Javascripts, woo!' }));
});
gulp.task('copystyles', function () {
    return gulp.src(['style/main.css'])
        .pipe($.rename({
            basename: "site"
        }))
        .pipe(gulp.dest('style'));
});


// Generate & Inline Critical-path CSS
gulp.task('critical', ['build', 'copystyles'], function (cb) {

    // At this point, we have our
    // production styles in main/styles.css

    // As we're going to overwrite this with
    // our critical-path CSS let's create a copy
    // of our site-wide styles so we can async
    // load them in later. We do this with
    // 'copystyles' above

    critical.generate({
        base: 'dist/',
        src: 'index.html',
        dest: 'style/site.css',
        width: 320,
        height: 480,
        minify: true,
        extract: true
    }, function(err, output){
        critical.inline({
            base: 'dist/',
            src: 'index.html',
            dest: 'index-critical.html',
            minify: true
        });        
    });
});

gulp.task('build', ['scripts']);

gulp.task('clean', function(cb) {
    del(['style', 'scripts', 'img'], cb)
});
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});
gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/img/**/*', ['images']);
});