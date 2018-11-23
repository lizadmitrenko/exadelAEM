const paths = require('../paths/config-paths');
const INPUT_JS = paths.INPUT_JS;
const OUTPUT_DIR = paths.OUTPUT_DIR;
const gulp = require('gulp');
const gzip = require('gulp-gzip');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');
module.exports = function () {
    let options = {
        context: __dirname + '/../src/components/MainPage/bundle-content',
        entry: {
            bundle: './bundle',
        },
        output: {
            path: __dirname + '/' + OUTPUT_DIR,
            filename: '[name].js',
            library: '[name]'
        },
        mode: 'production',
        watch: false,
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        watch: false,
        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                }]
        }
    };
    return gulp.src(INPUT_JS)
        .pipe(named())
        .pipe(webpackStream(options))
        .pipe(gulp.dest(OUTPUT_DIR))
        .pipe(gzip())
        .pipe(gulp.dest(OUTPUT_DIR));
};
