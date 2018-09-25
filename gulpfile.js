const gulp = require('gulp'),
    pump = require('pump'),
    nittro = require('gulp-nittro'),
    filter = require('gulp-filter'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    sourcemaps = require('gulp-sourcemaps');

const builder = new nittro.Builder({
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
        routing: false
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

gulp.task('js:main', function(cb) {
    pump(createTaskQueue('public/js/site.min.js', builder), cb);
});

gulp.task('css:main', function(cb) {
    pump(createTaskQueue('public/css/site.min.css', builder), cb);
});

gulp.task('js:assets', function() {
    return gulp.src(['assets/js/html5shiv.js'])
        .pipe(gulp.dest('public/js'));
});

gulp.task('css:assets', function() {
    return gulp.src(['assets/css/ie8.css', 'assets/css/ie9.css'])
        .pipe(gulp.dest('public/css'));
});

gulp.task('default', gulp.parallel('js:main', 'css:main', 'js:assets', 'css:assets'));





function exclude(pattern, ...queue) {
    const f = filter(file => !pattern.test(file.path), {restore: true});
    queue.unshift(f);
    queue.push(f.restore);
    return queue;
}

function createTaskQueue(outputFile, builder) {
    const m = /^(.+?)\/([^\/]+?\.(js|css))$/.exec(outputFile),
        path = m[1],
        file = m[2],
        type = m[3],
        queue = [
            nittro(type, builder),
            sourcemaps.init({loadMaps: true})
        ];

    if (type === 'js') {
        queue.push(... exclude(/\.(min|pack)\.[^.]+$/,
            uglify({compress: true, mangle: false})
        ));
    } else {
        queue.push(... exclude(/\.(min|pack)\.[^.]+$/,
            ... exclude(/\.css$/, less()),
            postcss([ autoprefixer(), cssnano() ])
        ));
    }

    queue.push(
        concat(file),
        sourcemaps.write('.', { mapFile: path => path.replace(/\.[^.]+(?=\.map$)/, '') }),
        gulp.dest(path)
    );

    return queue;
}
