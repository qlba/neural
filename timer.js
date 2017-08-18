'use strict';

var time = process.hrtime();

module.exports = function() {
	var diff = process.hrtime(time);

	return diff[0] + 1e-9 * diff[1];
};

module.exports.reset = () => time = process.hrtime();
