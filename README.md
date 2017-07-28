# assets-inject-webpack-plugin

Inject assets into any kind of template, using the core implementation of [gulp-inject](https://github.com/klei/gulp-inject).
In fact the plugin constructor uses the same options.

## Usage
````js 
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsInjectPlugin = require('assets-inject-webpack-plugin');

//same options object of [gulp-inject](https://github.com/klei/gulp-inject)
const injectOpt = {addPrefix:'my-app'};

const config = {
	entry: {
		app: './src/client/index.js',
		print: './src/client/print.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new AssetsInjectPlugin('./src/server/layout/layout.jade', injectOpt)
	]
};
module.exports = config;

````
## List of compatible file template types:
* Jade/Pug `.jade/.pug`
* HTML `.html`
* JSX `.jsx`
* LESS `.less`
* SASS/SCSS `.sass/.scss`

Contribute
===============

Commit Messages
-------
Rules are adopted from [the AngularJS commit conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/).

