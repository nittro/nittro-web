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
                        'bower_components/nittro/src/js/nittro/EventEmitter.js',
                        'bower_components/nittro/src/js/nittro/Freezable.js',
                        'bower_components/nittro/src/js/nittro/Object.js',
                        'bower_components/nittro/src/js/nittro/Utils/Tokenizer.js',
                        'bower_components/nittro/src/js/nittro/Neon/Neon.js',
                        'bower_components/nittro/src/js/nittro/Ajax/FormData.js',
                        'bower_components/nittro/src/js/nittro/Ajax/Request.js',
                        'bower_components/nittro/src/js/nittro/Ajax/Response.js',
                        'bower_components/nittro/src/js/nittro/Ajax/Service.js',
                        'bower_components/nittro/src/js/nittro/Ajax/Transport/Native.js',
                        'bower_components/nittro/src/js/nittro/Page/Snippet.js',
                        'bower_components/nittro/src/js/nittro/Page/Transitions.js',
                        'bower_components/nittro/src/js/nittro/Page/Service.js',
                        'bower_components/nittro/src/js/nittro/Forms/VendorCompiled.js',
                        'bower_components/nittro/src/js/nittro/Forms/Form.js',
                        'bower_components/nittro/src/js/nittro/Forms/Locator.js',
                        'bower_components/nittro/src/js/nittro/DI/Container.js',
                        'bower_components/nittro/src/js/nittro/DI/Context.js',
                        'bower_components/nittro/src/js/nittro/Application/Storage.js',
                        'bower_components/nittro/src/js/nittro/Application/Routing/URLRoute.js',
                        'bower_components/nittro/src/js/nittro/Application/Routing/DOMRoute.js',
                        'bower_components/nittro/src/js/nittro/Application/Routing/Router.js',
                        'bower_components/nittro/src/js/nittro/Widgets/DialogBase.js',
                        'bower_components/nittro/src/js/nittro/Widgets/Dialog.js',
                        'bower_components/nittro/src/js/nittro/Widgets/Confirm.js',
                        'bower_components/nittro/src/js/nittro/Widgets/FormDialog.js',
                        'bower_components/nittro/src/js/nittro/Widgets/FlashMessages.js',
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
