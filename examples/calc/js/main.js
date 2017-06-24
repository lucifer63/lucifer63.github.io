(function() {
	const origin = 'https://lucifer63.github.io';

	document.addEventListener("DOMContentLoaded", initCalc);

	function initCalc() {
		var calc = new Calculator( document.getElementById('calculator') );

			opener.postMessage({ 
				caller: 'calc',
				event: 'init',
				data: 'asd'
			}, origin); 
		try {
		} catch (error) {}
	}
})();