const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const obfuscate = require('gulp-obfuscate');

// Compile SASS files to CSS
function compilaSass() {
    return gulp.src('source/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    })).on('error', sass.logError)
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('build/styles'));
}

//compile JavaScript files
function compilaJS() {
    return gulp.src('source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('build/scripts'));
}

// Optimize images
function otimizaImagens() {
    return gulp.src('source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'));
}

exports.default = function() {
    gulp.watch('source/styles/*.scss',{ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('source/scripts/*.js',{ignoreInitial: false}, gulp.series(compilaJS));
    gulp.watch('source/images/*', {ignoreInitial: false}, gulp.series(otimizaImagens));
};