'use strict';

const devWebpackTask = require('./webpack-configs/devWebpack.config');
const prodWebpackTask = require('./webpack-configs/prodWebpack.config');

const paths = require('./paths/config-paths');
const BROWSER_SYNC_RELOAD_DELAY = 500;

const gulp = require('gulp');

// STYLES
const less = require('gulp-less');
const postcss = require('gulp-postcss');

// POSTCSS PLUGINS
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

// UTILS
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');

// DEV ENV
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();


function styles(outputDir) {
    return gulp.src(paths.INPUT_BUNDLE + '/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(postcss([
            autoprefixer({
                browsers: [
                    'last 1 version',
                    'not ie <= 11'
                ]
            }),
            cssnano()
        ]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(outputDir))
        .pipe(browserSync.stream());
}

function cleanTask(outputDir) {
    return gulp.src(outputDir, { read: false, allowEmpty: true })
        .pipe(clean({ force: true }));
}

function browserSyncTask() {
    browserSync.init(null, {
        proxy: 'http://localhost:8080',
        browser: 'chrome',
        port: 8000,
    });
}

function attachJCRIdentifier(){
    return gulp.src(paths.AEM_DIR + '/.content.xml')
        .pipe(gulp.dest(paths.OUTPUT_DIR_PROD));

}

function nodemonTask(cb) {
    let started = false;
    return nodemon({
        script: 'server.js',
        ext: 'js hbs'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    })
        .on('restart', function onRestart() {
            setTimeout(function reload() {
                browserSync.reload({
                    stream: false
                });
            }, BROWSER_SYNC_RELOAD_DELAY);
        });
}

function watch() {
    gulp.watch([paths.SRC_DIR + '/**/*.less', paths.INPUT_BUNDLE + '/*.less'], { usePolling: true }, gulp.series(() => styles(paths.OUTPUT_DIR)));
    gulp.watch([paths.SRC_DIR +  '/**/*.ts', paths.INPUT_BUNDLE + '/*.ts'], { usePolling: true }, gulp.series(devWebpackTask));
}

gulp.task('devBuild', gulp.series(() => cleanTask(paths.OUTPUT_DIR), gulp.parallel(() => styles(paths.OUTPUT_DIR), devWebpackTask)));
gulp.task('prodBuild', gulp.series(() => cleanTask(paths.OUTPUT_DIR_PROD), attachJCRIdentifier, gulp.parallel(() => styles(paths.OUTPUT_DIR_PROD), prodWebpackTask)));

gulp.task('devWebpackTask', devWebpackTask);
gulp.task('default',
    gulp.series('devBuild', gulp.parallel(watch, browserSyncTask, nodemonTask))
);

gulp.task('prod',
    gulp.series('prodBuild')
);
