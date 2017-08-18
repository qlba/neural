'use strict';

var sprintf = require('printf');

class AbstractNeuron {
	constructor(n, W) {
		if (W.length !== n + 1) {
			throw new RangeError('Invalid weight array length');
		}

		this.n = n;
		this.W = W;
	}

	toString() {
		return this.W.map(w => sprintf('%15.8f', w)).join(' ');
	}
}

class Perceptron extends AbstractNeuron {
	constructor(n, W) {
		super(n, W);
	}

	y(X) {
		if (X.length !== this.n) {
			throw new RangeError('Invalid something');
		}

		var s = this.W[this.n];

		for(var i = 0; i < this.n; i++) {
			s += this.W[i] * X[i];
		}

		return s > 0 ? 1 : -1;
	}

	train(X, d) {
		var y = this.y(X);

		if(y !== d) {
			this.W[this.n] += d;

			for(var i = 0; i < this.n; i++) {
				this.W[i] += d * X[i];
			}
		}

		return y - d;
	}
}

// class Adaline extends 



module.exports = {Perceptron};
