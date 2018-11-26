const path = require('path');
const paths = require('../paths/config-paths');

const gulp = require('gulp');

const webpackStream = require('webpack-stream');

//TS PLUGINS
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');

// UTILS
const named = require('vinyl-named');

// DEV ENV
const browserSync = require('browser-sync').create();

module.exports = function () {
    let options = {
        mode: 'development',
        context:  path.join(__dirname, paths.CONTEXT_PATH),
        entry: {
            bundle: './bundle.ts',
            polyfill: './polyfill.ts',
        },
        devtool: 'inline-source-map',
        output: {
            path: path.join(__dirname, '/', paths.OUTPUT_DIR),
            filename: '[name].js',
            library: '[name]'
        },

        module: {
            rules: [{
                test: /\.ts?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                    configFile: path.join(__dirname, paths.TS_CONFIG)
                }
            }]
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin({
                tsconfig: path.join(__dirname, paths.TS_CONFIG)
            }),
            new TSLintPlugin({
                files: [paths.SRC_DIR + '/*.ts'],
                format: 'codeFrame'
            })
        ],
        resolve: {
            extensions: ['.ts', '.js']
        }
    };
    return gulp.src(paths.INPUT_JS)
        .pipe(named())
        .pipe(webpackStream(options))
        .pipe(gulp.dest(paths.OUTPUT_DIR))
        .pipe(browserSync.stream());
};
