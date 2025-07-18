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

initCalculator();


