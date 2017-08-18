'use strict';

var sprintf = require('printf');

module.exports = function(...args) {
	process.stdout.write(sprintf.apply(null, args));
};
