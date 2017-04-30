var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    nittro = require('gulp-nittro'),
    sourcemaps = require('gulp-sourcemaps');

var builder = new nittro.Builder({
    vendor: {
        js: [
            'assets/js/highlight.pack.js',
            'assets/js/cookie-policy.js'
        ],
        css: [
            'assets/css/hljs/darkula.css',
            'assets/css/font-awesome.min.css',
            'assets/css/cookie-policy.less'
        ]
    },
    base: {
        core: true,
        datetime: true,
        neon: true,
        di: true,
        forms: true,
        ajax: true,
        page: true,
        flashes: true,
        routing: true
    },
    extras: {
        checklist: true,
        dropzone: true,
        keymap: true
    },
    libraries: {
        js: [
            'assets/js/App/FormRules.js',
            'assets/js/App/Tabs.js'
        ],
        css: [
            'assets/css/main.css',
            'assets/css/custom.less'
        ]
    },
    bootstrap: {
        services: {
            'tabs': 'App.Tabs()!'
        }
    },
    stack: true
});

gulp.task('js-main', function() {
    return nittro('js', builder)
        .pipe(sourcemaps.init())
        .pipe(concat('site.min.js'))
        .pipe(uglify({
            mangle: false,
            compress: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/_js/'));
});

gulp.task('css-main', function() {
    return nittro('css', builder)
        .pipe(sourcemaps.init())
        .pipe(concat('site.min.css'))
        .pipe(less({
            compress: true
        }))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/_css/'));
});

gulp.task('js-assets', function() {
    return gulp.src(['assets/js/html5shiv.js'])
        .pipe(gulp.dest('public/_js/'));
});

gulp.task('css-assets', function() {
    return gulp.src(['assets/css/ie8.css', 'assets/css/ie9.css'])
        .pipe(gulp.dest('public/_css/'));
});
1
gulp.task('default', ['js-main', 'css-main', 'js-assets', 'css-assets']);
