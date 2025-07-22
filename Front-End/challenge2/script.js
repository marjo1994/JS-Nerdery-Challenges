const showResult = document.getElementById('display');
const numberButtons = document.querySelectorAll('button:not(.operation-btn)');
const operationButtons = document.querySelectorAll('.operation-btn');

const calculatorState = {
  input: '0',
  firstNumber: null,
  operator: null,
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
    const { input, shouldResetInput } = calculatorState;

    const number = btn.textContent;
    
    if (shouldResetInput) {
      //After an operation, reset input.
      //After a number, reset input.
      calculatorState.input = number;
      calculatorState.shouldResetInput = false;
    } else {
      //Store the input.
      calculatorState.input = input === '0' ? number : input + number;
    }

    updateResult();
}

const handleOperationButtons = (btn) => {
  const { input, firstNumber, operator, shouldResetInput } = calculatorState;
  const operation = btn.textContent;
  const inputValue = parseFloat(input);
  
  //Calculate the result of operation
  if (operation === '=') {
    if (firstNumber !== null && operator) {
      calculate(inputValue);
      calculatorState.operator = null;
      calculatorState.shouldResetInput = true;
    }
    return;
  }

  
  //!shouldResetInput, avoid select an operator after another operator.
  if (operator && !shouldResetInput) {
    calculate(inputValue);
  }

  //Prepare for the next operation, store values as firstNumber, operator and shouldResetInput.
  calculatorState.firstNumber = parseFloat(calculatorState.input); // Se asigna el valor del input al número que se ingresa o que se obtiene último para el caso de las operaciones consecutivas
  calculatorState.operator = operation; // Se asigna el operation a la variable operator
  //calculatorState.waitingForSecondNumber = true;
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



