var gulp = require('gulp'); // Подключаем Gulp
var sass = require('gulp-sass'); //Подключаем Sass пакет
var concat = require('gulp-concat'); // Подключаем для конкатенации файлов
var autoprefixer = require('gulp-autoprefixer'); // Подключаем для автоматического добавления префиксов
var cleanCSS = require('gulp-clean-css'); // Подключаем для минификации CSS стилей
var uglify = require('gulp-uglify-es').default; // Подключаем для сжатия JS
var del = require('del');
var pug = require('gulp-pug');
var pugbem = require('gulp-pugbem');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

var paths = {
    styles: {
        src: './src/scss/styles.scss',
        dest: './build/css'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: './build/js'
    },
    html: {
        src: 'src/pug/*.pug',
        dest: './build'
    },
    img: {
        src: 'src/img/**/*',
        dest: './build/img'
    }
};

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 0.1%'],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: '2'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());

}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

function html() {
    return gulp.src(paths.html.src)
        .pipe(pug({
            plugins: [pugbem],
            pretty: true
        }))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
}

function img() {
    return gulp.src(paths.img.src)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 3}),
            imageminPngquant({quality: [0.8, 0.9], speed: 5}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest(paths.img.dest))
        .pipe(browserSync.stream());
}


// Наблюдение за изменениями в файлах
function watch() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.img.src, img);
    gulp.watch('./*.html', browserSync.reload);
}


gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('html', html);
gulp.task('watch', watch);
gulp.task('img', img);

gulp.task('build', gulp.parallel(html, styles, scripts));
