const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
// Compile SCSS to CSS
gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('css'));
});
// Watch for changes in SCSS and JS files
gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', gulp.series('sass'));
});
// Default task
gulp.task('default', gulp.series('sass' , 'watch'));
