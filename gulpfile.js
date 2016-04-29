const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

// initial app directories, will need to add more as repo expands
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
gulp.task('watch', () => {
  gulp.watch(testFiles, ['test:mocha', 'lint:testFiles']);
  gulp.watch(appFiles, ['test:mocha', 'lint:appFiles']);
});

gulp.task('default', ['watch', 'lint', 'test']);
