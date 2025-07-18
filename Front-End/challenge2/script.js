const showResult = document.getElementById('display');
const numberButtons = document.querySelectorAll('button:not(.operation-btn)');
const operationButtons = document.querySelectorAll('.operation-btn');

const calculatorState = {
  input: '0',
  firstNumber: null,
  operator: null,
  waitingForSecondNumber: false,
  shouldResetInput: true
};

const initCalculator = () => {
  setupEventListeners();
  updateResult();
}

//Display result
const updateResult = () => {
  showResult.textContent = calculatorState.input;
}

const setupEventListeners = () => {
  //Click on each number button
  numberButtons.forEach(btn => btn.addEventListener('click', () => handleNumberButtons(btn)));
  //Click on each operation button
  operationButtons.forEach(btn => btn.addEventListener('click', () => handleOperationButtons(btn)))
}

const handleNumberButtons = (btn) => {
    const { input, waitingForSecondNumber, shouldResetInput } = calculatorState;

    const number = btn.textContent;
    
    if (shouldResetInput) {
      //After an operation, reset input.
      console.log('reset');
      calculatorState.input = number;
      calculatorState.shouldResetInput = false;
      calculatorState.waitingForSecondNumber = false;
    } else if (waitingForSecondNumber) {
      //After click on a operator, waiting for the second number.
      console.log('b number');
      calculatorState.input = number;
      calculatorState.waitingForSecondNumber = false;
    } else {
      //Store the input.
      calculatorState.input = input === '0' ? number : input + number;
    }

    updateResult();
}

const handleOperationButtons = (btn) => {
  const { input, firstNumber, operator } = calculatorState;

  const operation = btn.textContent;
  const inputValue = parseFloat(input);
  
  //Calculate the result of operation
  if (operation === '=') {
    if (firstNumber !== null && operator) {
      calculate(inputValue);
      calculatorState.operator = null;
    }
    calculatorState.shouldResetInput = true;
    return;
  }

  //Do consecutive operations
  if (operator && !calculatorState.waitingForSecondNumber) {
    calculate(inputValue);
  }

  calculatorState.firstNumber = parseFloat(calculatorState.input);
  calculatorState.operator = operation;
  calculatorState.waitingForSecondNumber = true;
  calculatorState.shouldResetInput = true;
}


//Calculate operations as +, -, x, /
const calculate = (secondNumber) => {
  const { firstNumber, operator } = calculatorState;
  let result;
  
  switch (operator) {
    case '+':
      result = firstNumber + secondNumber; 
      break;
    case '-': 
      result = firstNumber - secondNumber; 
      break;
    case 'X': 
      result = firstNumber * secondNumber;
      break;
    case '/': 
      if (secondNumber === 0) {
        alert("Error: Can't divide by zero");
        return;
      }
      result = firstNumber / secondNumber;
      break;
    default: 
      return;
  }
  
  calculatorState.input = String(result);
  calculatorState.firstNumber = result;

  updateResult();
}


initCalculator();



