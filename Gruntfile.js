module.exports = function (grunt) {

    grunt.initConfig({
        netteForms: {
            fix: {
                files: {
                    'assets/js/netteForms.js': [
                        'bower_components/nette-forms/src/assets/netteForms.js'
                    ]
                }
            }
        },
        uglify: {
            min: {
                options: {
                    mangle: false,
                    sourceMap: true,
                    sourceMapIncludeSources: true
                },
                files: {
                    'www/_js/site.min.js': [
                        'assets/js/netteForms.js',
                        'bower_components/nittro/src/js/promise.js',
                        'bower_components/nittro/src/js/context.js',
                        'bower_components/nittro/src/js/Utils/Strings.js',
                        'bower_components/nittro/src/js/Utils/Arrays.js',
                        'bower_components/nittro/src/js/Utils/HashMap.js',
                        'bower_components/nittro/src/js/Utils/DateInterval.js',
                        'bower_components/nittro/src/js/Utils/DateTime.js',
                        'bower_components/nittro/src/js/Utils/Url.js',
                        'bower_components/nittro/src/js/Utils/DOM.js',
                        'bower_components/nittro/src/js/Utils/ReflectionClass.js',
                        'bower_components/nittro/src/js/Utils/ReflectionFunction.js',
                        'bower_components/nittro/src/js/Nittro/EventEmitter.js',
                        'bower_components/nittro/src/js/Nittro/Freezable.js',
                        'bower_components/nittro/src/js/Nittro/Object.js',
                        'bower_components/nittro/src/js/Nittro/Utils/Tokenizer.js',
                        'bower_components/nittro/src/js/Nittro/Neon/Neon.js',
                        'bower_components/nittro/src/js/Nittro/Ajax/FormData.js',
                        'bower_components/nittro/src/js/Nittro/Ajax/Request.js',
                        'bower_components/nittro/src/js/Nittro/Ajax/Response.js',
                        'bower_components/nittro/src/js/Nittro/Ajax/Service.js',
                        'bower_components/nittro/src/js/Nittro/Ajax/Transport/Native.js',
                        'bower_components/nittro/src/js/Nittro/Page/Snippet.js',
                        'bower_components/nittro/src/js/Nittro/Page/Transitions.js',
                        'bower_components/nittro/src/js/Nittro/Page/Service.js',
                        'bower_components/nittro/src/js/Nittro/Forms/VendorCompiled.js',
                        'bower_components/nittro/src/js/Nittro/Forms/Form.js',
                        'bower_components/nittro/src/js/Nittro/Forms/Locator.js',
                        'bower_components/nittro/src/js/Nittro/DI/Container.js',
                        'bower_components/nittro/src/js/Nittro/DI/Context.js',
                        'bower_components/nittro/src/js/Nittro/Application/Storage.js',
                        'bower_components/nittro/src/js/Nittro/Application/Routing/URLRoute.js',
                        'bower_components/nittro/src/js/Nittro/Application/Routing/DOMRoute.js',
                        'bower_components/nittro/src/js/Nittro/Application/Routing/Router.js',
                        'bower_components/nittro/src/js/Nittro/Widgets/DialogBase.js',
                        'bower_components/nittro/src/js/Nittro/Widgets/Dialog.js',
                        'bower_components/nittro/src/js/Nittro/Widgets/Confirm.js',
                        'bower_components/nittro/src/js/Nittro/Widgets/FormDialog.js',
                        'bower_components/nittro/src/js/Nittro/Widgets/FlashMessages.js',
                        'assets/js/highlight.pack.js',
                        'assets/js/App/Wiki.js',
                        'assets/js/App/Tabs.js',
                        'assets/js/App/HashNav.js',
                        'assets/js/bootstrap.js',
                        'bower_components/nittro/src/js/stack.js'
                    ]
                }
            }
        },
        less: {
            min: {
                options: {
                    compress: true,
                    sourceMap: true,
                    sourceMapURL: 'site.min.css.map'
                },
                files: {
                    'www/_css/site.min.css': [
                        'bower_components/nittro/src/css/nittro-dialog.less',
                        'bower_components/nittro/src/css/nittro-flashes.less',
                        'bower_components/nittro/src/css/nittro-transitions.less',
                        'assets/css/hljs/darkula.css',
                        'assets/css/font-awesome.min.css',
                        'assets/css/main.css'
                    ]
                }
            }
        },
        copy: {
            assets: {
                files: [
                    { src: 'assets/css/ie*', dest: 'www/_css/', expand: true },
                    { src: 'assets/js/html5shiv.js', dest: 'www/_js/' }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['netteForms', 'uglify', 'less', 'copy']);

    grunt.registerMultiTask('netteForms', 'Fix netteForms.js', function () {
        this.files.forEach(function (f) {
            var source = f.src.map(grunt.file.read).join("\n");
            source = source.replace(/^[ \t]*global\.Nette\.initOnLoad\(\);[ \t]*$/mg, '');
            grunt.file.write(f.dest, source);

            grunt.file.write(f.dest, source);
            grunt.log.ok('Fixed ' + f.dest.replace(/^.+?([^\/]+)$/, '$1'));

        });
    });

};
