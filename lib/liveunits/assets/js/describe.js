var describe = (function() {

var tests = [];
var context = [];
var errors = [];
var count = 0;

function describe(name, fn) {
	
	context.push({
		name: name,
		tests: [],
		run: function() {
			for(var i = 0; i < this.tests.length; ++i) {
				this.tests[i].run();
			}
		}
	});
	
	fn();
	
	var last = context.pop();
	
	if(context.length) {
		context[context.length - 1].tests.push(last);
	} else {
		tests.push(last);
	}
}

function it(name, fn) {
	
	if(!context.length)
		throw new Error("No context");
		
	context[context.length - 1].tests.push({
		name: name,
		run: function() {
			count ++;
			try {
				fn();
			} catch(ex) {
				errors.push([this.name, ex]);
			}
		}
	});
}

function run() {
	
	for(var i = 0; i < tests.length; ++i) {
		tests[i].run();
	}
	
	if(errors.length) {
		console.log(errors.length + " of " + count + " tests failed\n");
		for(var i = 0; i < errors.length; ++i) {
			console.log((i + 1) + ") " + errors[i][0] + "\n");
			console.log(errors[i][1].stack);
		}
	} else {
		console.log(count + " tests complete");
	}
}

describe.run = run;
describe.it = it;

return describe;

}) ();

var it = describe.it;