module.exports = function(grunt) {
    var clear = function() {
        process.stdout.write('\033[H\033[2J');
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            files: ['style.less'],
            tasks: ['clear', 'default'],
            options: {
                spawn: false
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
                            'resume.pdf',
                            'style.css',
                            'index.html',
                            'favicon.ico',
                            'img/'
                        ],
                        dest: 'dist/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['less', 'copy:dist']);
    grunt.registerTask('clear', clear);
};
