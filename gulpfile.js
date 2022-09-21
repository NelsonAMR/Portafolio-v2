const {src, dest, watch, series} = require('gulp');

//CSS SASS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

//JAVASCRIPT
const terser = require('gulp-terser-js');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');


function css(done){
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer, cssnano]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));

    done();
}

function js(done){
    src('src/js/app.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}

function img(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{PNG,svg,pdf}')
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('build/img') )
    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);

    done();
}

exports.build = series(css, js, img);
exports.css = css;
exports.js = js;
exports.img = img;
exports.dev = dev;
exports.default = series(css, js, dev);