'use strict';

var path = require('path');

module.exports = function extname(file) {
	file = file.split('?')[0];
	return path.extname(file).slice(1);
};
