module.exports = {
	dev: {
		options: {
			append: true,
			module: 'notesweb'
		},
		cwd: '<%= config.src.app %>',
		src: [
			'**/*.html',
			'!*.html'
		],
		dest: '<%= config.dist.root %>notesweb.js'
	},
	dist: {
		options: {
			append: true,
			module: 'notesweb',
			htmlmin: {
				removeComments: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true
			}
		},
		cwd: '<%= config.src.app %>',
		src: [
			'**/*.html',
			'!*.html'
		],
		dest: '<%= config.dist.root %>notesweb.js'
	}
};
