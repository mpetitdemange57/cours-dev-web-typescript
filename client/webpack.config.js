'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');


module.exports = {
	entry: {
		main: './src/js/index.js'
	},
	module: {
		rules: [
			{
				test: /\.(woff|otf|eot|ttf|svg)(.*)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'asset/fonts/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'asset/[name].[ext]'
						}
					}
				]
			},
			// { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['url-loader'] },
			{
				test: /\.(scss|css)$/,
				use: [
					{
						loader: 'style-loader', // inject CSS to page
					},
					{
						loader: 'css-loader', // translates CSS into CommonJS modules
					},
					'resolve-url-loader',
					{
						loader: 'postcss-loader', // Run post css actions
						options: {
							plugins: function () { // post css plugins, can be exported to postcss.config.js
								return [
									require('precss'),
									require('autoprefixer')
								];
							}
						}
					},
					{
						loader: 'sass-loader?sourceMap' // compiles Sass to CSS
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new CopyWebpackPlugin([
			{from: 'src/asset', to: 'asset'}
		]),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery'",
			"window.$": "jquery"
		})
	]
};