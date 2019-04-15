const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify-es').default;
const rename = require("gulp-rename");

const paths = {
  styles: {
    src: 'src/scss/*.scss',
    dest: './build/css'
  },
  bootstrap: {
    src: 'node_modules/bootstrap/scss/bootstrap.scss',
    dest: './build/css'
  },
  js: {
    src: 'src/js/*.js',
    dest: './build/js'
  }
}


// Sass and CSS stuff... 
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(rename('main.min.css'))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream()) 
}

// Bootstrap Sass Compiler function
function bootstrap() {
  return gulp.src(paths.bootstrap.src)
    .pipe(rename('bootstrap.min.css'))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream()) 
}

// JavaScript stuff...
function scripts() {
  // return gulp.src(['src/js/main.js', 'src/js/foursquare.js'])
  return gulp.src(paths.js.src)
  .pipe(eslint.format({
    'rules': {
      'quotes': [1, 'single']
    }
  }))
  .pipe(concat('app.min.js'))
  .pipe(sourcemaps.init())
  // .pipe(uglify({ // http://lisperator.net/uglifyjs/codegen
  //   output: { // https://github.com/mishoo/UglifyJS2#output-options
  //     comments: false,
  //     quote_style: 3,
  //   }
  // }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.js.dest));
}

// This one takes care of browsersync when theres an html change
function update(done) {
  browserSync.reload();
  done();
}

// The default gulp task... simply run 'gulp' to make magic happen
function watcher() {
  browserSync.init({
    server: { baseDir: './' }
  });

  gulp.watch('*.html', update);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.bootstrap.src, bootstrap);
  gulp.watch(paths.js.src, scripts);
}


exports.sass = styles;
exports.bootstrap = bootstrap;
exports.scripts = scripts;
exports.default = watcher;
