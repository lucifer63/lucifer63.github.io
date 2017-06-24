(function() {
	var operators = ['+', '-', 'x', '÷'];

	window.Calculator = function( base_element ) {
		// Get all the keys from document
		var $this = this;
		var keys = base_element.querySelectorAll('span');
		$this.decimalAdded = false;
		$this.input = base_element.querySelector('.screen');

		// Add onclick event to all the keys and perform operations
		for(var i = 0; i < keys.length; i++) {
			keys[i].onclick = function(e) {
				// Get the input and button values
				$this.inputVal = $this.input.innerHTML;
				var btnVal = this.innerHTML;
				
				// Now, just append the key values (btnValue) to the input string and finally use javascript's eval function to get the result
				// If clear key is pressed, erase everything
				if(btnVal == 'C') {
					$this.input.innerHTML = '';
					$this.decimalAdded = false;
				}
				
				// If eval key is pressed, calculate and display the result
				else if(btnVal == '=') {
					$this.evaluate();
				}
				
				// Basic functionality of the calculator is complete. But there are some problems like 
				// 1. No two operators should be added consecutively.
				// 2. The equation shouldn't start from an operator except minus
				// 3. not more than 1 decimal should be there in a number
				
				// We'll fix these issues using some simple checks
				
				// indexOf works only in IE9+
				else if(operators.indexOf(btnVal) > -1) {
					// Operator is clicked
					// Get the last character from the equation
					var lastChar = $this.inputVal[$this.inputVal.length - 1];
					
					// Only add operator if input is not empty and there is no operator at the last
					if ($this.input.inputVal != '' && operators.indexOf(lastChar) == -1) 
						$this.input.innerHTML += btnVal;
					
					// Allow minus if the string is empty
					else if($this.inputVal == '' && btnVal == '-') 
						$this.input.innerHTML += btnVal;
					
					// Replace the last operator (if exists) with the newly pressed operator
					if(operators.indexOf(lastChar) > -1 && $this.inputVal.length > 1) {
						// Here, '.' matches any character while $ denotes the end of string, so anything (will be an operator in this case) at the end of string will get replaced by new operator
						$this.input.innerHTML = $this.inputVal.replace(/.$/, btnVal);
					}
					
					$this.decimalAdded =false;
				}
				
				// Now only the decimal problem is left. We can solve it easily using a flag 'decimalAdded' which we'll set once the decimal is added and prevent more decimals to be added once it's set. It will be reset when an operator, eval or clear key is pressed.
				else if(btnVal == '.') {
					if(!$this.decimalAdded) {
						$this.input.innerHTML += btnVal;
						$this.decimalAdded = true;
					}
				}
				
				// if any other key is pressed, just append it
				else {
					$this.input.innerHTML += btnVal;
				}
				
				// prevent page jumps
				e.preventDefault();
			} 
		}
	}

	Calculator.prototype = {
		evaluate: function() {
			var equation = this.inputVal;
			var lastChar = equation[equation.length - 1];
			
			// Replace all instances of x and ÷ with * and / respectively. This can be done easily using regex and the 'g' tag which will replace all instances of the matched character/substring
			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
			
			// Final thing left to do is checking the last character of the equation. If it's an operator or a decimal, remove it
			if(operators.indexOf(lastChar) > -1 || lastChar == '.')
				equation = equation.replace(/.$/, '');
			
			if(equation)
				this.input.innerHTML = eval(equation);
				
			this.decimalAdded = false;
		}
	}
})();