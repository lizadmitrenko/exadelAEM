'use strict';
const devWebpackTask = require('./webpack-configs/devWebpack.config');
const prodWebpackTask = require('./webpack-configs/prodWebpack.config');
const paths = require('./paths/config-paths');
const INPUT_BUNDLE = paths.INPUT_BUNDLE;
const OUTPUT_DIR = paths.OUTPUT_DIR;
const BROWSER_SYNC_RELOAD_DELAY = 500;
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const less = require('gulp-less');
const concat = require('gulp-concat');
const minifyCss = require('gulp-clean-css');
const gzip = require('gulp-gzip');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const typescript = require('gulp-typescript');
const rename = require('gulp-rename');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();
function styles() {
    return gulp.src(INPUT_BUNDLE + '/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(OUTPUT_DIR))
        .pipe(browserSync.stream())
        .pipe(gzip())
        .pipe(gulp.dest(OUTPUT_DIR));
}
function clean() {
    return del(OUTPUT_DIR);
}
function browserSyncTask() {
    browserSync.init(null, {
        proxy: 'http://localhost:8080',
        browser: 'chrome',
        port: 8000,
    });
}
function nodemonTask(cb) {
    let started = false;
    return nodemon({
        script: 'server.js'
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
function eslintTask() {
    return gulp.src([INPUT_BUNDLE + '/*.ts', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}
function watch() {
    gulp.watch(INPUT_BUNDLE + '/*.less', { usePolling: true }, gulp.series(styles));
    gulp.watch(INPUT_BUNDLE + '/*.ts', { usePolling: true }, gulp.series(devWebpackTask));
}
const tsProject = typescript.createProject("tsconfig.json", { typescript: require('typescript') });
function backend() {
    const tsResult = tsProject.src().pipe(typescript(tsProject));
    return tsResult.js
        .pipe(rename(function (path) { path.dirname = path.dirname.replace("src", ""); }))
        .pipe(gulp.dest("build/"));
}
gulp.task('devBuild', gulp.series(clean, gulp.parallel(styles, devWebpackTask, backend)));
gulp.task('prodBuild', gulp.series(clean, gulp.parallel(styles, prodWebpackTask)));
gulp.task('devWebpackTask', devWebpackTask);
gulp.task('default', gulp.series('devBuild', gulp.parallel(watch, browserSyncTask, nodemonTask)));
gulp.task('prod', gulp.series('prodBuild', nodemonTask));
