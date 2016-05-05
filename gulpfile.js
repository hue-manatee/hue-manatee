const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var appFiles = ['*.js', './lib/**/*.js', './routes/**/*.js', './models/**/*.js'];
var testFiles = ['./test/**/*.js'];

gulp.task('test:mocha', () => {
  return gulp.src(testFiles)
    .pipe(mocha());
});

gulp.task('lint:testFiles', () => {
  return gulp.src(testFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:appFiles', () => {
  return gulp.src(appFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', ['test:mocha']);
gulp.task('lint', ['lint:testFiles', 'lint:appFiles']);

gulp.task('default', ['lint', 'test']);
