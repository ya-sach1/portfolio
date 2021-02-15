const colors = require('tailwindcss/colors');

module.exports = {
	purge: ['./src/**/*.html', './src/**/*.js'],
	theme: {
		colors: {
			...colors,
		},
	},
};
