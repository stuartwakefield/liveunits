tester.addTest("fibonacci", {
	
	testFirstIsZero: function() {
		assertion.areEqual(0, fibonacci(0));
	},
	
	testSecondIsOne: function() {
		assertion.areEqual(1, fibonacci(1));
	},
	
	testThirdIsOne: function() {
		assertion.areEqual(1, fibonacci(2));
	},
	
	testFourthIsTwo: function() {
		assertion.areEqual(2, fibonacci(3));
	},
	
	testFifthIsThree: function() {
		assertion.areEqual(3, fibonacci(4));
	}
	
});