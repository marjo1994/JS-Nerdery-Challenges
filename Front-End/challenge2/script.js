const showResult = document.getElementById('display');
const numberButtons = document.querySelectorAll('button:not(.operation-btn)');
const operationButtons = document.querySelectorAll('.operation-btn');

const calculatorState = {
  input: '0',
  firstNumber: null,
  operator: null,
  waitingForSecondNumber: false,
};

const initCalculator = () => {
  setupEventListeners();
  updateResult();
}

const updateResult = () => {
  showResult.textContent = calculatorState.input;
}

const setupEventListeners = () => {
  //NumberButtons
  numberButtons.forEach(btn => btn.addEventListener('click', () => handleNumberButtons(btn)));
  //OperationButtons
  operationButtons.forEach(btn => btn.addEventListener('click', () => handleOperationButtons(btn)))
}

const handleNumberButtons = (btn) => {
    const { input, waitingForSecondNumber } = calculatorState;

    const number = btn.textContent;
        
    if (waitingForSecondNumber) {
        calculatorState.input = number;
        calculatorState.waitingForSecondNumber = false;
    } else {
        calculatorState.input = input === '0' ? number : input + number;
    }
    updateResult();
}

const handleOperationButtons = (btn) => {
  const { input, firstNumber, operator } = calculatorState;

  const operation = btn.textContent;
  const inputValue = parseFloat(input);
  
  if (operation === '=') {
    if (firstNumber !== null && operator) {
      calculate(inputValue);
    }
    return;
  }
  
  if (firstNumber === null) {
    calculatorState.firstNumber = inputValue;
  } else if (operator) {
    calculate(inputValue);
  }
  
  calculatorState.operator = operation;
  calculatorState.waitingForSecondNumber = true;
}

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
      result = firstNumber / secondNumber;
      break;
    default: 
      return;
  }
  
  calculatorState.input = String(result);

  updateResult();
}


initCalculator();



