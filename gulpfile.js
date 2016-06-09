const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const cp = require('child_process');
const webpack = require('webpack-stream');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const minifyCss = require('gulp-minify-css');
var children = [];
var appFiles = ['*.js', './lib/**/*.js', './routes/**/*.js', './models/**/*.js'];
var testFiles = [
  './test/auth_test.js', './test/bridge_test.js', './test/hex_module_test.js',
   './test/light_test.js', './test/rgb_module_test.js',
   './test/server_test.js', './test/test_setup.js', './test/test_teardown.js'
];

gulp.task('webpack:dev', () => {
  gulp.src('app/js/entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('webpack:test', () => {
  gulp.src('./test/front_end/unit/test_entry.js')
   .pipe(webpack({
     devtool: 'source-map',
     module: {
        loaders: [{
          test: /\.html$/,
          loader: 'html'
        }]
      },
     output: {
       filename: 'bundle.js'
     }
   }))
    .pipe(gulp.dest('./test'));
});

gulp.task('static:dev', ['webpack:dev'], () => {
  gulp.src(['app/**/*.html'])
   .pipe(gulp.dest('./build'));
});

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

gulp.task('sass:dev', () => {
  return gulp.src('app/sass/**/*.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(maps.write())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('sass:watch', ['sass:dev'], () => {
  gulp.watch('./app/sass/**/*.scss');
});

gulp.task('start:server', () => {
  children.push(cp.fork('server.js'));
  children.push(cp.spawn('mongod', ['--dbpath=./db']));
  children.push(cp.fork('app_server.js', [], { env: {
    MONGODB_URI: 'mongodb://localhost/hue_test_db' } }));
  children.push(cp.spawn('webdriver-manager', ['start']));
});

gulp.task('build:dev', ['webpack:dev', 'static:dev', 'sass:dev']);
gulp.task('test', ['test:mocha']);
gulp.task('lint', ['lint:testFiles', 'lint:appFiles']);

gulp.task('default', ['lint', 'test']);
