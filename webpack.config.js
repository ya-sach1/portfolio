const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const purgecss = require('@fullhuman/postcss-purgecss');
const glob = require('glob');

module.exports = (_env, argv) => ({
	entry: './src/main.js',

	output: {
		path: __dirname + '/build',
		filename: 'main.js',
	},

	module: {
		rules: [
			{
				test: /\.css$/gi,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['tailwindcss', 'autoprefixer'].concat(
									argv.mode === 'production'
										? [
												'cssnano',
												purgecss({
													content: ['./src/**/index.html', './dist/**/index.html'],
												}),
										  ]
										: [],
								),
							},
						},
					},
				],
			},
			{
				test: /\.[mc]?js$/gi,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},

	plugins: glob.sync('src/**/index.html').map(
		(f) =>
			new HtmlWebpackPlugin({
				template: f,
				filename: f.split('/').slice(1).join('/'),
			}),
	),

	optimization: {
		minimize: argv.mode === 'production',
		minimizer: [new TerserPlugin()],
	},
});
