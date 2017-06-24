var caller_url = 'https://lucifer63.github.io/examples/calc/caller.html';

document.addEventListener("DOMContentLoaded", initCalc);

function initCalc() {
	var calc = new Calculator( document.getElementById('calculator') );

		opener.postMessage({ 
			caller: 'calc',
			event: 'init',
			data: 'asd'
		}, caller_url); 
	try {
	} catch (error) {}
}

