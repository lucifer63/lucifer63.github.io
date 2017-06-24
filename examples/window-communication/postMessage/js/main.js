(function() {
	const origin = 'https://lucifer63.github.io';

	var listeners = {
		base: {}
	};

	document.addEventListener("DOMContentLoaded", initCalc);

	function initCalc() {
		var calc = new Calculator( document.getElementById('calculator') );

		listeners.base.evaluate = calc.evaluate.bind(calc);

		opener.postMessage({ 
			caller: 'calc',
			name: 'init'
		}, origin); 
	}

	window.addEventListener('message', function(custom_event) {
		if (custom_event.origin === origin) {
			listeners[ custom_event.data.caller ][ custom_event.data.name ]( custom_event.data.data || null );
		} else { 
			return;
		} 
	});
})();