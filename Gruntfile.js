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
                        'bower_components/NetteJS/src/js/promise.js',
                        'bower_components/NetteJS/src/js/context.js',
                        'bower_components/NetteJS/src/js/Utils/Strings.js',
                        'bower_components/NetteJS/src/js/Utils/Arrays.js',
                        'bower_components/NetteJS/src/js/Utils/HashMap.js',
                        'bower_components/NetteJS/src/js/Utils/DateInterval.js',
                        'bower_components/NetteJS/src/js/Utils/DateTime.js',
                        'bower_components/NetteJS/src/js/Utils/Url.js',
                        'bower_components/NetteJS/src/js/Utils/DOM.js',
                        'bower_components/NetteJS/src/js/Utils/ReflectionClass.js',
                        'bower_components/NetteJS/src/js/Utils/ReflectionFunction.js',
                        'bower_components/NetteJS/src/js/Nette/EventEmitter.js',
                        'bower_components/NetteJS/src/js/Nette/Freezable.js',
                        'bower_components/NetteJS/src/js/Nette/Object.js',
                        'bower_components/NetteJS/src/js/Nette/Utils/Tokenizer.js',
                        'bower_components/NetteJS/src/js/Nette/Neon/Neon.js',
                        'bower_components/NetteJS/src/js/Nette/Ajax/FormData.js',
                        'bower_components/NetteJS/src/js/Nette/Ajax/Request.js',
                        'bower_components/NetteJS/src/js/Nette/Ajax/Response.js',
                        'bower_components/NetteJS/src/js/Nette/Ajax/Service.js',
                        'bower_components/NetteJS/src/js/Nette/Ajax/Transport/Native.js',
                        'bower_components/NetteJS/src/js/Nette/Page/Snippet.js',
                        'bower_components/NetteJS/src/js/Nette/Page/Transitions.js',
                        'bower_components/NetteJS/src/js/Nette/Page/Service.js',
                        'bower_components/NetteJS/src/js/Nette/Forms/VendorCompiled.js',
                        'bower_components/NetteJS/src/js/Nette/Forms/Form.js',
                        'bower_components/NetteJS/src/js/Nette/Forms/Locator.js',
                        'bower_components/NetteJS/src/js/Nette/DI/Container.js',
                        'bower_components/NetteJS/src/js/Nette/DI/Context.js',
                        'bower_components/NetteJS/src/js/Nette/Application/Storage.js',
                        'bower_components/NetteJS/src/js/Nette/Application/Routing/URLRoute.js',
                        'bower_components/NetteJS/src/js/Nette/Application/Routing/DOMRoute.js',
                        'bower_components/NetteJS/src/js/Nette/Application/Routing/Router.js',
                        'bower_components/NetteJS/src/js/Nette/Widgets/DialogBase.js',
                        'bower_components/NetteJS/src/js/Nette/Widgets/Dialog.js',
                        'bower_components/NetteJS/src/js/Nette/Widgets/Confirm.js',
                        'bower_components/NetteJS/src/js/Nette/Widgets/FormDialog.js',
                        'bower_components/NetteJS/src/js/Nette/Widgets/FlashMessages.js',
                        'assets/js/highlight.pack.js',
                        'assets/js/App/Wiki.js',
                        'assets/js/App/Tabs.js',
                        'assets/js/App/HashNav.js',
                        'assets/js/bootstrap.js',
                        'bower_components/NetteJS/src/js/stack.js'
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
                        'bower_components/NetteJS/src/css/nette-dialog.less',
                        'bower_components/NetteJS/src/css/nette-flashes.less',
                        'bower_components/NetteJS/src/css/nette-transitions.less',
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
