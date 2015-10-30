'use strict';

var config = require('./config').scripts;
// var path = require('path');
var webpack = require('webpack');
module.exports = {
	cache: true,
	entry: {
		app: config.src,
	},
	output: {
		path: config.dest,
		publicPath: '/scripts/',
		filename: '[name].js',
		chunkFilename: '[name].bundle.js' // name || id || chunkhash
	},
	module: {
		loaders: [
			// Consider replacing babel with these if you're making a React App
			// { test: /\.json$/, loader: 'json-loader' },
			{ test: /\.js$/, loader: 'jsx-loader?harmony' },
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel'
			}
		]
	},
	plugins: [
		// Use this if you want to chunk shared libraries
		// new webpack.optimize.CommonsChunkPlugin('shared.js'),
		//
		new webpack.ProvidePlugin({
			// Automtically detect jQuery and $ as free var in modules
			// and inject the jquery library
			// This is required by many jquery plugins
			jQuery: 'jquery',
			$: 'jquery'
				// Swiper: 'swiper'
		})
	],

	// Replace modules by other modules or paths.
	// https://webpack.github.io/docs/configuration.html#resolve
	// resolve: {
	// 	alias: {}
	// }
};
