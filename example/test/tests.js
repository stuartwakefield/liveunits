var assert = require("assert");
var fibonacci = require("../lib/fibonacci");

describe("#fibonacci", function() {
	
	it("returns zero as the zeroth index", function() {
		assert.equal(0, fibonacci(0));
	});
	
	it("returns one as the first index", function() {
		assert.equal(1, fibonacci(1));
	});
	
	it("returns one as the second index", function() {
		assert.equal(1, fibonacci(2));
	});
	
	it("returns two as the third index", function() {
		assert.equal(2, fibonacci(3));
	});
	
	it("returns three as the fourth index", function() {
		assert.equal(3, fibonacci(4));
	});
	
	it("returns 12586269025 as the fiftieth index", function() {
		assert.equal(12586269025, fibonacci(50));
	});
	
	it("returns 190392490709135 as the seventieth index", function() {
		assert.equal(190392490709135, fibonacci(70));
	});
	
});