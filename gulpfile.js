var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    nittro = require('gulp-nittro');

var builder = new nittro.Builder({
    vendor: {
        js: [
            'assets/js/highlight.pack.js'
        ],
        css: [
            'assets/css/hljs/darkula.css',
            'assets/css/font-awesome.min.css'
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
        storage: true,
        routing: true
    },
    extras: {
        flashes: true,
        dialogs: true,
        confirm: true,
        dropzone: true,
        paginator: true
    },
    libraries: {
        js: [
            'assets/js/App/Wiki.js',
            'assets/js/App/Tabs.js',
            'assets/js/App/HashNav.js'
        ],
        css: [
            'assets/css/main.css',
            'assets/css/custom.less'
        ]
    },
    bootstrap: {
        services: {
            'wiki': 'App.Wiki()!',
            'tabs': 'App.Tabs()!',
            'hashNav': 'App.HashNav(margin: 30)!'
        }
    },
    stack: true
});

gulp.task('js-main', function() {
    return nittro('js', builder)
        .pipe(concat('site.min.js'))
        /*.pipe(uglify({
            mangle: false,
            compress: true
        }))*/
        .pipe(gulp.dest('www/_js/'));
});

gulp.task('css-main', function() {
    return nittro('css', builder)
        .pipe(concat('site.min.css'))
        .pipe(less({
            compress: true
        }))
        .pipe(gulp.dest('www/_css/'));
});

gulp.task('js-assets', function() {
    return gulp.src(['assets/js/html5shiv.js'])
        .pipe(gulp.dest('www/_js/'));
});

gulp.task('css-assets', function() {
    return gulp.src(['assets/css/ie8.css', 'assets/css/ie9.css'])
        .pipe(gulp.dest('www/_css/'));
});

gulp.task('default', ['js-main', 'css-main', 'js-assets', 'css-assets']);
