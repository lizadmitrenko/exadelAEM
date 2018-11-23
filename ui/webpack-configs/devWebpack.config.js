const path = require('path');
const paths = require('../paths/config-paths');
const CONTEXT_PATH = path.join(__dirname, '/../src/components/bundle-content');
const TS_CONFIG = path.join(__dirname, '../tsconfig.json');

const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const browserSync = require('browser-sync').create();


module.exports = function () {
    let options = {
        mode: 'development',
        context: CONTEXT_PATH,
        entry: {
            bundle: './bundle.ts',
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
                    configFile: TS_CONFIG
                }
            }]
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin({
                tsconfig: TS_CONFIG
            }),
            new TSLintPlugin({
                files: [paths.INPUT_BUNDLE + '/*.ts'],
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
        .pipe(browserSync.stream())
};

