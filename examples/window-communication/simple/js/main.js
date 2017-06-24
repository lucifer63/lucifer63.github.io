(function() {
	document.addEventListener("DOMContentLoaded", initCalc);

	function initCalc() {
		var calc = new Calculator( document.getElementById('calculator') );
		window.evaluateCalc = calc.evaluate.bind(calc);

		opener.initCalc();
	}
})();