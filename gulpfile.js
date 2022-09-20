const {src, dest, watch, series} = require('gulp');

//CSS SASS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');


function css(done){
    src('src/scss/app.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'));

    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css);

    done();
}

exports.css = css;
exports.dev = dev;
exports.default = series(css, dev);