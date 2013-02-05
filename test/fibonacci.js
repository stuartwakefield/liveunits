function fibonacci(n) {
	if(n < 2) {
		return n;
	} else {
		var a = 0;
		var b = 1;
		while(n-- > 1) {
			b = a + b;
			a = b - a;
		}
		return b;
	}
}