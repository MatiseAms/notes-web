module.exports = {
	demo: {
		files: [{
			'<%= config.dist.root %>notesweb.js': ['<%= config.dist.root %>notesweb.js'],
			'<%= config.dist.root %>vendor.js': ['<%= config.dist.root %>vendor.js']
		}]
	}
};
