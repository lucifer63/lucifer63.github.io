document.addEventListener("DOMContentLoaded", initCalc);

function initCalc() {
	var calc = new Calculator( document.getElementById('calculator') );
	try {
		opener.update({ 
			caller: 'calc',
			event: 'init',
			data: {
				instance: calc
			}
		});
	} catch (error) {}
}

