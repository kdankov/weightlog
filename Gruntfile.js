'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			options: {
				includePaths: ['bower_components/foundation/scss']
			},
			dist: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					'css/app.css': 'scss/app.scss'
				},
			},
			sourceMap: {
				options: {
					sourceComments: 'map',
					sourceMap: 'app.css.map'
				},
				files: {
					'css/app.css': 'scss/app.scss'
				}
			},
		},
		watch: {
			scripts: {
				files: ['scss/*.scss'],
				tasks: ['sass'],
			},
			livereload: {
				files: ['*.html', '*.php', 'js/**/*.{js,json}', 'css/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
				options: {
					livereload: true
				}
			}
		},
	});

	grunt.registerTask('default', ['sass', 'watch']);

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
};
