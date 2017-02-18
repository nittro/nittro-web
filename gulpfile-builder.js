var gulp = require('gulp'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    nittro = require('gulp-nittro'),
    sourcemaps = require('gulp-sourcemaps'),
    minimist = require('minimist'),
    zip = require('gulp-zip');


var options = minimist(process.argv.slice(2), {
    string: 'job-dir'
});


var jobDir = options['job-dir'];

if (!jobDir) {
    gutil.log('Job dir not specified');
    process.exit(1);
} else if (jobDir.charAt(0) === '/') {
    if (jobDir.substr(0, __dirname.length + 1) === __dirname + '/') {
        jobDir = jobDir.substr(__dirname.length + 1);
    } else {
        gutil.log('Invalid job dir: outside project directory');
        process.exit(1);
    }
}

jobDir = jobDir.replace(/\/$/, '');

if (!fs.existsSync(jobDir + '/nittro.json')) {
    gutil.log('Job config file not found');
    process.exit(1);
}

var config = JSON.parse(fs.readFileSync(jobDir + '/nittro.json'));

function fixPaths(key) {
    key = key.split(/\./g);
    var c = config;

    for (var i = 0; i < key.length; i++) {
        if (c[key[i]]) {
            c = c[key[i]];
        } else {
            return;
        }
    }

    if (Array.isArray(c)) {
        c.forEach(function (item, i, c) {
            c[i] = jobDir + '/' + item;
        });
    }
}

function fixMapPath(sourcePath, file) {
    if (sourcePath.substr(0, jobDir.length) === jobDir) {
        return sourcePath.substr(jobDir.length + 1);
    } else {
        return sourcePath.replace(/^node_modules\//, '');
    }
}

fixPaths('vendor.js');
fixPaths('vendor.css');
fixPaths('libraries.js');
fixPaths('libraries.css');

if (typeof config.bootstrap === 'string') {
    config.bootstrap = jobDir + '/' + config.bootstrap;
}

var builder = new nittro.Builder(config);

gulp.task('js', function () {
    return nittro('js', builder)
        .pipe(sourcemaps.init())
        .pipe(concat('nittro.min.js'))
        .pipe(uglify({mangle: false, compress: true}))
        .pipe(sourcemaps.write('.', { mapSources: fixMapPath }))
        .pipe(gulp.dest(jobDir + '/dist'));
});

gulp.task('css', function () {
    return nittro('css', builder)
        .pipe(sourcemaps.init())
        .pipe(less({compress: true}))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(concat('nittro.min.css'))
        .pipe(sourcemaps.write('.', { mapSources: fixMapPath }))
        .pipe(gulp.dest(jobDir + '/dist'));
});

gulp.task('zip', ['js', 'css'], function () {
    return gulp.src([jobDir + '/dist/**', jobDir + '/nittro.json'])
        .pipe(zip('nittro.zip'))
        .pipe(gulp.dest(jobDir));
});

gulp.task('default', ['zip']);
