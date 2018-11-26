const path = require('path');
const paths = require('../paths/config-paths');

const gulp = require('gulp');

const webpackStream = require('webpack-stream');

// UTILS
const named = require('vinyl-named');

module.exports = function () {
    let options = {
        mode: 'production',
        context: path.join(__dirname, '/../src/bundles'),
        entry: {
            bundle: './bundle.ts',
            polyfill: './polyfill.ts',
        },
        output: {
            path: path.join(__dirname + '/' + paths.OUTPUT_DIR),
            filename: '[name].js',
            library: '[name]'
        },
        module: {
            rules: [{
                test: /\.ts?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true
                }
            }]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },

    };
    return gulp.src(paths.INPUT_JS)
        .pipe(named())
        .pipe(webpackStream(options))
        .pipe(gulp.dest(paths.OUTPUT_DIR_PROD));
};
