'use strict'

module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true
        },
        files: {
          'src/assets/css/base/base.min.css': [
            'src/assets/css/base/base.less'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('dev', ['less']);
}