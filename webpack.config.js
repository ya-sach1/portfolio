const HtmlPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const path = require('path');
const purgecss = require('@fullhuman/postcss-purgecss');
const glob = require('glob');

const favicon = glob.sync('src/favicon.*').sort((a, b) => (a < b) - (a > b))[0] || null;
// The above is a convenient way to prioritize images by web-ready-ness. WEBP > PNG > JPG > ICO

module.exports = (_env, argv) => ({
	entry: './src/main.js',

	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'main.js',
	},

	module: {
		rules: [
			{
				test: /\.css$/i,
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
												purgecss({
													content: ['./src/**/*.html', './src/**/*.js'],
													safelist: [90, 180, 270, 360].map((v) => `la-rotate-${v}`),
												}),
												'cssnano',
										  ]
										: [],
								),
							},
						},
					},
				],
			},
			{
				test: /\.(?:png|gif|ico|jpe?g|webp|avif|svg)$/i,
				use: {
					loader: 'url-loader',
					options: {
						limit: 4096,
					},
				},
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
						},
					},
				],
			},
		].concat(
			argv.mode === 'production'
				? [
						{
							test: /\.[mc]?js$/i,
							exclude: /node_modules/,
							use: {
								loader: 'babel-loader',
								options: {
									presets: ['@babel/preset-env'],
									plugins: ['@babel/plugin-syntax-dynamic-import'],
								},
							},
						},
				  ]
				: [],
		),
	},
	plugins: glob.sync('src/**/*.html').map(
		(f) =>
			new HtmlPlugin(
				Object.assign(
					{
						template: f,
						filename: f.split('/').slice(1).join('/'),
						meta: {
							author: require('./package.json').author,
							viewport: 'width=device-width, initial-scale=1',
							title: "Sach1's Website",
							description: 'This is my mindblowing website.',
							'theme-color': '#ffc0cb',
						},
						hash: argv.mode === 'production',
						scriptLoading: 'defer',
					},
					favicon === null ? {} : { favicon },
				),
			),
	),
	optimization: {
		minimize: argv.mode === 'production',
		minimizer: [new TerserPlugin()],
		splitChunks: {
			chunks: argv.mode === 'production' ? 'all' : 'async',
		},
	},
});
