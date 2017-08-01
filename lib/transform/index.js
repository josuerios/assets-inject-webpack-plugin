'use strict';
var extname = require('../extname');

/**
 * Constants
 */
var TARGET_TYPES = ['html', 'jade', 'pug', 'jsx', 'less', 'sass', 'scss'];
var IMAGES = ['jpeg', 'jpg', 'png', 'gif'];
var DEFAULT_TARGET = TARGET_TYPES[0];

/**
 * Transform module
 */
var transform = module.exports = function (filepath, i, length, sourceFile, targetFile) {
	var type;
	if (targetFile && targetFile.path) {
		var ext = extname(targetFile.path);
		type = typeFromExt(ext);
	}
	if (!isTargetType(type)) {
		type = DEFAULT_TARGET;
	}
	var func = transform[type];
	if (func) {
		return func.apply(transform, arguments);
	}
};

/**
 * Options
 */

transform.selfClosingTag = false;

/**
 * Transform functions
 */
TARGET_TYPES.forEach(function (targetType) {
	transform[targetType] = function (filepath) {
		var ext = extname(filepath);
		var type = typeFromExt(ext);
		var func = transform[targetType][type];
		if (func) {
			return func.apply(transform[targetType], arguments);
		}
	};
});

transform.html.css = function (filepath) {
	return '<link rel="stylesheet" href="' + filepath + '"' + end();
};

transform.html.js = function (filepath) {
	return '<script src="' + filepath + '"></script>';
};
transform.html.map = transform.html.js;

transform.html.jsx = function (filepath) {
	return '<script type="text/jsx" src="' + filepath + '"></script>';
};

transform.html.html = function (filepath) {
	return '<link rel="import" href="' + filepath + '"' + end();
};


transform.html.image = function (filepath) {
	return '<img src="' + filepath + '"' + end();
};

transform.jade.css = function (filepath) {
	return 'link(rel="stylesheet", href="' + filepath + '")';
};

transform.jade.js = function (filepath) {
	return 'script(src="' + filepath + '")';
};

transform.jade.jsx = function (filepath) {
	return 'script(type="text/jsx", src="' + filepath + '")';
};

transform.jade.jade = function (filepath) {
	return 'include ' + filepath;
};

transform.jade.html = function (filepath) {
	return 'link(rel="import", href="' + filepath + '")';
};


transform.jade.image = function (filepath) {
	return 'img(src="' + filepath + '")';
};

transform.pug.css = function (filepath) {
	return 'link(rel="stylesheet", href="' + filepath + '")';
};

transform.pug.js = function (filepath) {
	return 'script(src="' + filepath + '")';
};

transform.pug.jsx = function (filepath) {
	return 'script(type="text/jsx", src="' + filepath + '")';
};

transform.pug.pug = function (filepath) {
	return 'include ' + filepath;
};

transform.pug.html = function (filepath) {
	return 'link(rel="import", href="' + filepath + '")';
};


transform.pug.image = function (filepath) {
	return 'img(src="' + filepath + '")';
};


transform.less.less = function (filepath) {
	return '@import "' + filepath + '";';
};

transform.less.css = transform.less.less;

transform.sass.sass = function (filepath) {
	return '@import "' + filepath + '"';
};

transform.sass.scss = transform.sass.sass;
transform.sass.css = transform.sass.sass;

transform.scss.sass = transform.less.less;
transform.scss.scss = transform.scss.sass;
transform.scss.css = transform.scss.sass;

/**
 * Transformations for jsx is like html
 * but always with self closing tags, invalid jsx otherwise
 */
Object.keys(transform.html).forEach(function (type) {
	transform.jsx[type] = function () {
		var originalOption = transform.selfClosingTag;
		transform.selfClosingTag = true;
		var result = transform.html[type].apply(transform.html, arguments);
		transform.selfClosingTag = originalOption;
		return result;
	};
});

function end() {
	return transform.selfClosingTag ? ' />' : '>';
}

function typeFromExt(ext) {
	ext = ext.toLowerCase();
	if (isImage(ext)) {
		return 'image';
	}
	return ext;
}

function isImage(ext) {
	return IMAGES.indexOf(ext) > -1;
}

function isTargetType(type) {
	if (!type) {
		return false;
	}
	return TARGET_TYPES.indexOf(type) > -1;
}
