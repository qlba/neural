'use strict';

var printf = require('./printf');



var n = 4;

var w0 = 1,
	ws = (new Array(n)).fill(1);

function adaline(xs) {
	var s = w0;

	for(var i = 0; i < n; i++) {
		s += ws[i] * xs[i];
	}

	// return s > 0 ? 1 : -1;
	return s;
}

function setWeights(nws) {
	if(nws.length != n + 1) {
		throw new Error(';fkjad[oadf[gk' + nws.length + ' ' + n + 1);
	}

	w0 = nws[0];
	ws = nws.slice(1);
}

function train(test_data, roundsMax) {
	var time = process.hrtime();

	printf.apply(null, [
		' %6s %7s' + ' %10s'.repeat(n + 1) + ' %13s\n',
		'ROUND',
		'Q',
		'w0'
	].concat(
		(new Array(n)).fill(1).map((v, i) => 'w' + (i + v))
	).concat(['TIME']));

	for(var round = 0; round < roundsMax; round++) {
		var roundError = 0;

		for(var set = 0; set < test_data.length; set++) {
			var s = adaline(test_data[set].xs),
				epsilon = test_data[set].d - s,
				eta = 1;
			
			if(epsilon) {
				roundError += 0.5 * epsilon * epsilon;

				var nw0, nws = [], k = eta * epsilon;

				nw0 = w0 + k * 1;

				for(var i = 0; i < n; i++) {
					nws.push(ws[i] + k * test_data[set].xs[i]);
				}

				setWeights([nw0].concat(nws));
			}
		}

		var diff = process.hrtime(time);

		printf.apply(null, [
			' %6s %7.5f' + ' %10.5f'.repeat(n + 1) + ' %13.1f' + ' '.repeat(20) + '\r',
			round,
			roundError,
			w0
		].concat(
			ws
		).concat([
			(diff[0] + diff[1] / 1e9)
		]));

		if(Math.abs(epsilon) < 0.001) {
			break;
		}
	}

	process.stdout.write('\n');
}

var testData = [
	{d:  1, xs: [1, 0, 0, 1]},
	{d: -1, xs: [0, 1, 0, 0]},
	{d:  1, xs: [0, 0, 1, 0]},
	{d: -1, xs: [0, 0, 0, 1]}
];

train(testData, 1000000);
