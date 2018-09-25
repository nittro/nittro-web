const gulp = require('gulp'),
    pump = require('pump'),
    minimist = require('minimist'),
    log = require('fancy-log'),
    fs = require('fs'),
    filter = require('gulp-filter'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    nittro = require('gulp-nittro'),
    sourcemaps = require('gulp-sourcemaps'),
    zip = require('gulp-zip');


const jobDir = resolveJobDir();
const config = JSON.parse(fs.readFileSync(jobDir + '/nittro.json'));

fixPaths('vendor.js');
fixPaths('vendor.css');
fixPaths('libraries.js');
fixPaths('libraries.css');

if (typeof config.bootstrap === 'string') {
    config.bootstrap = jobDir + '/' + config.bootstrap;
}

const builder = new nittro.Builder(config);

gulp.task('js', function (cb) {
    pump(createTaskQueue(jobDir + '/dist/nittro.min.js', builder), cb);
});

gulp.task('css', function (cb) {
    pump(createTaskQueue(jobDir + '/dist/nittro.min.css', builder), cb);
});

gulp.task('zip', function (cb) {
    pump([
        gulp.src([jobDir + '/dist/**', jobDir + '/nittro.json']),
        zip('nittro.zip'),
        gulp.dest(jobDir),
    ], cb);
});

gulp.task('default', gulp.series(gulp.parallel('js', 'css'), 'zip'));



function resolveJobDir () {
    const options = minimist(process.argv.slice(2), {
        string: 'job-dir'
    });

    if (process.cwd() !== __dirname) {
        log.error('Invalid working directory');
        process.exit(1);
    }

    let jobDir = options['job-dir'];

    if (!jobDir) {
        log.error('Job dir not specified');
        process.exit(1);
    } else if (jobDir.charAt(0) === '/') {
        if (jobDir.substr(0, __dirname.length + 1) === __dirname + '/') {
            jobDir = jobDir.substr(__dirname.length + 1);
        } else {
            log.error(`Invalid job dir: outside project directory`);
            process.exit(1);
        }
    }

    jobDir = jobDir.replace(/\/$/, '');

    if (!fs.existsSync(jobDir + '/nittro.json')) {
        log.error('Job config file not found');
        process.exit(1);
    }

    return jobDir;
}

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
        sourcemaps.write('.', { mapSources: fixMapPath }),
        gulp.dest(path)
    );

    return queue;
}

function fixPaths(key) {
    key = key.split(/\./g);
    let c = config;

    for (let i = 0; i < key.length; i++) {
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

function fixMapPath(path) {
    if (path.substr(0, jobDir.length) === jobDir) {
        return path.substr(jobDir.length + 1);
    } else {
        return path.replace(/^node_modules\//, '');
    }
}
