module.exports = {
	scripts: {
		src: [
			'<%= config.src.app %>notesweb.js',				// Core module
			'<%= config.src.app %>notesweb-controller.js',	// Core controller
			'<%= config.src.app %>**/*.js',				// Module parts
			'!<%= config.src.app %>**/*.spec.js'		// Exclude Jasmine specs
		],
		dest: '<%= config.dist.root %>notesweb.js'
	},
	dist: {
		src: [
			'<%= config.src.vendor %>modernizr.js',
			'<%= config.src.vendor %>jquery.js',
			'<%= config.src.vendor %>foundation/js/foundation.js',
			'<%= config.src.vendor %>angular.js',
			'<%= config.src.vendor %>angular-ui-router.js',
			'<%= config.src.vendor %>angulartics.js',
			'<%= config.src.vendor %>angulartics-google-analytics.js'
		],
		dest: '<%= config.dist.root %>vendor.js'
	}
};
