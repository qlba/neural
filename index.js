'use strict';

var printf = require('./printf'),
	timer = require('./timer');


var n = 4;
var W = (new Array(n + 1)).fill(1);


function train(test_data, roundsMax) {
	timer.reset();

	printf.apply(null, [' %6s %7s' + ' %10s'.repeat(n + 1) + ' %13s\n',
		'ROUND', 'Q'].concat((new Array(n + 1)).fill(0).map((v, i) => 'w' + (i))).concat(['TIME']));

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

		printf.apply(null, [
			' %6s %7.5f' + ' %10.5f'.repeat(n + 1) + ' %13.1f' + ' '.repeat(20) + '\r',
			round, roundError].concat(W).concat([timer()]));

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
