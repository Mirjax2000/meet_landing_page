/** @format */

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const flatten = require('gulp-flatten');
const autoprefixer = require('autoprefixer');
const webp = require('gulp-webp');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');

function compileSass() {
    return (
        gulp
            .src('./scss/**/*.scss')
            .pipe(sourcemaps.init())
            // .pipe(sass({ sourceMap: true }).on('error', sass.logError))
            .pipe(
                sass({ outputStyle: 'expanded', sourceMap: true }).on(
                    'error',
                    sass.logError
                )
            )

            // .pipe(autoprefixer())
            .pipe(postcss([autoprefixer()]))
            .pipe(sourcemaps.write('.'))
            .pipe(flatten())
            .pipe(gulp.dest('./css'))
    );
}

function compileMini() {
    return (
        gulp
            .src('./scss/**/*.scss')
            .pipe(sourcemaps.init())
            .pipe(
                sass({ outputStyle: 'compressed', sourceMap: true }).on(
                    'error',
                    sass.logError
                )
            )
            // .pipe(autoprefixer())
            .pipe(postcss([autoprefixer()]))
            .pipe(sourcemaps.write('.'))
            .pipe(flatten())
            .pipe(gulp.dest('./css'))
    );
}

function generateWebp() {
    return gulp
        .src('./imgInput/**/*.{png,jpg,jpeg}')
        .pipe(webp())
        .pipe(gulp.dest('./imgOutput'));
}

function watchFiles() {
    gulp.watch('./scss/**/*.scss', compileSass);
    // gulp.watch('./image/**/*', gulp.series(generateWebp));
}

exports.default = gulp.series(
    compileSass,
    gulp.parallel(generateWebp),
    watchFiles
);

exports.working = gulp.series(compileSass, watchFiles);
exports.picture = gulp.series(generateWebp);
exports.mini = gulp.series(compileMini);
