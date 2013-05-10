var assert = (function() {

function assert(value, message) {
	assert.ok(value, message);
};

function format(obj) {
	return JSON.stringify(obj);
}

function fail(actual, expected, message, operator, stackStartFunction) {
	throw new Error(message || format(actual) + " " + operator + " " + format(expected));
};
	
assert.ok = function(value, message) {
	assert.equal(true, !!value, message);
};
	
assert.fail = fail;
	
assert.equal = function(actual, expected, message) {
	if(actual != expected)
		fail(actual, expected, message, "==");
};
	
assert.notEqual = function(actual, expected, message) {
	if(actual == expected)
		fail(actual, expected, message, "!=");
};
	
function deepEqual(actual, expected) {
	
	if(actual === expected)
		return true;
		
	else if(actual instanceof Date && expected instanceof Date)
		return actual.valueOf() === expected.valueOf();
	
	else if(actual instanceof RegExp && expected instanceof RegExp)
		return actual.source === expected.source &&
			actual.global === expected.global &&
			actual.multiline === expected.multiline &&
			actual.lastIndex === expected.lastIndex &&
			actual.ignoreCase === expected.ignoreCase;
	
	else if(typeof actual !== "object" && typeof expected !== "object") 
		return actual == expected;
		
	else if(typeof actual === "object" && typeof expected === "object" && actual.prototype === expected.prototype) {
		var keys = {};
		
		for(var x in actual)
			if(actual.hasOwnProperty(x))
				keys[x] = true;
				
		for(var x in expected)
			if(expected.hasOwnProperty(x))
				keys[x] = true;	
				
		for(var x in keys)
			if(keys.hasOwnProperty(x))
				if(!actual.hasOwnProperty(x) || !expected.hasOwnProperty(x) || !deepEqual(actual[x], expected[x]))
					return false;
				
		return true;
	}
	
	return false;
};

assert.deepEqual = function(actual, expected, message) {
	if(!deepEqual(actual, expected))
		fail(actual, expected, message, "deepEqual");
}

assert.notDeepEqual = function(actual, expected, message) {
	if(deepEqual(actual, expected))
		fail(actual, expected, message, "notDeepEqual");
};

assert.strictEqual = function(actual, expected, message) {
	if(actual !== expected)
		fail(actual, expected, message, "===");
};

assert.notStrictEqual = function(actual, expected, message) {
	if(actual === expected)
		fail(actual, expected, message, "!==");
};

function expectedException(actual, expected) {
	
	if(!actual || !expected)
		return false;
	
	if(typeof error === "function") {
		return error(ex);
	} else if(error instanceof RegExp) {
		return error.test(ex);
	} else {
		return ex instanceof error;
	}
	
	return false;
}

assert.throws = function(block, error, message) {
	
	var actual;

	try {
		block();
	} catch(ex) {
		actual = ex;
	}
	
	if(!expectedException(actual, error))
		fail(actual, error, message);
};

assert.doesNotThrow = function(block, message) {
	try {
		block();
	} catch(ex) {
		fail(ex, null, message)
	}
};

assert.ifError = function(value) {
	if(value)
		throw new Error("");
};

return assert;

}) ();