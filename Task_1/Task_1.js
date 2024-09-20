let currentInput = '';  // Stores the entire equation
let resultDisplayed = false;  // Flag to check if result has been displayed

// Updating display
function updateDisplay() {
  document.getElementById('display').textContent = currentInput || '0';
}

// Handle input (numbers or operators)
function input(value) {
  // If result was displayed and a number is entered, start a new equation
  if (resultDisplayed && !isNaN(value)) {
    currentInput = value;  // Start new equation
    resultDisplayed = false;
  } else {
    // If the result was displayed but an operator is entered, continue the calculation
    if (resultDisplayed && isNaN(value)) {
      resultDisplayed = false;
    }
    // Append the value to the current input
    currentInput += value;
  }
  updateDisplay();
}

// Clear the display
function clearDisplay() {
  currentInput = '';
  resultDisplayed = false;
  updateDisplay();
}

// Delete the last character
function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

// Perform the calculation
function calculate() {
  try {
    // Evaluate the full equation
    const result = eval(currentInput);
    currentInput = String(result);  // Display the result
    resultDisplayed = true;  // Mark that the result has been displayed
    updateDisplay();
  } catch (error) {
    // Handle errors (like malformed expressions)
    currentInput = 'Error';
    updateDisplay();
  }
}
