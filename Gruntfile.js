module.exports = function(grunt) {
    var clear = function() {
        process.stdout.write('\033[H\033[2J');
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        markdown: {
            all: {
                options: {
                    template: 'template.jst',
                    markdownOptions: {
                        gfm: true
                    }
                },
                files: [
                    {
                        flatten: true,
                        expand: true,
                        src: 'markdown/*.md',
                        dest: 'html/',
                        ext: '.md.html'
                    }
                ]
            }
        },
        'import': {
            build: {
                src: 'html/main.html',
                dest: 'index.html'
            }
        },
        watch: {
            all: {
                files: ['style.less', 'markdown/**', 'html/**'],
                tasks: ['clear', 'default'],
                options: {
                    spawn: false
                }
            },
            less: {
                files: ['style.less'],
                tasks: ['clear', 'less'],
                options: {
                    spawn: false
                }
            }
        },
        less: {
            style: {
                files: {
                    'style.css': 'style.less'
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        src: [
                            'ga.js',
                            'resume.pdf',
                            'style.css',
                            'index.html',
                            'favicon.ico',
                        ],
                        dest: 'dist/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-import');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['markdown', 'import', 'less', 'copy:dist']);
    grunt.registerTask('clear', clear);
};
