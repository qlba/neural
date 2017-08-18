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

	s(X) {
		if (X.length !== this.n) {
			throw new RangeError('Invalid input array length');
		}

		var s = this.W[this.n];

		for(var i = 0; i < this.n; i++) {
			s += this.W[i] * X[i];
		}

		return s;
	}

	toString() {
		return this.W.map(w => sprintf('%15.8f', w)).join(' ');
	}
}

class AbstractTresholdNeuron extends AbstractNeuron {
	y(X) {
		return this.s(X) > 0 ? 1 : -1;
	}
}

class Perceptron extends AbstractTresholdNeuron {
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

class Adaline extends AbstractTresholdNeuron {
	constructor(n, W, eta = 0.5) {
		super(n, W);

		if(eta < 0) {
			throw new RangeError('Eta cannot be negative');
		}

		this.eta = eta;
	}

	train(X, d) {
		var s = this.s(X),
			epsilon = d - s;
		
		var k = this.eta * epsilon;

		this.W[this.n] += k;

		for(var i = 0; i < this.n; i++) {
			this.W[i] += k * X[i];
		}

		return -epsilon;
	}
}


module.exports = {
	Perceptron,
	Adaline
};
