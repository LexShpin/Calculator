const userInput = document.querySelector('.user-input');
const resultField = document.querySelector('.result-field');

const clearBtn = document.querySelector('.clear-btn');
const deleteBtn = document.querySelector('.delete-btn');

const calculatorBtns = document.querySelectorAll('.calculator-btn');
const operationBtns = document.querySelectorAll('.operation-btn');
const equalBtn = document.querySelector('.equal-btn');

let firstOperand;
let secondOperand;
let operationChosen = false;
let operation;
let result;

clearBtn.addEventListener('click', () => {
    userInput.textContent = '0';
    firstOperand = 0;
    secondOperand = 0;
    result = 0;
    operationChosen = false;
    operation = '';
});

deleteBtn.addEventListener('click', () => {
    
    if (userInput.textContent == 'Error' || userInput.textContent == 'NaN') {
        userInput.textContent = '';
    }

    let str = userInput.textContent.split('');
    str.pop();
    userInput.textContent = str.join('');
    if (userInput.textContent == '') {
        userInput.textContent = '0';
    }    
});

// Entering the numbers
calculatorBtns.forEach(btn => btn.addEventListener('click', () => {
    if (userInput.textContent == '0' || userInput.textContent == 'Error') {
        userInput.textContent = btn.textContent.trim();
    } else {
        userInput.textContent += btn.textContent.trim();
    }
}));

operationBtns.forEach(btn => btn.addEventListener('click', () => {
    if (operationChosen) {
        return;
    }

    switch(btn.dataset.operation) {
        case 'divide':
            userInput.textContent += btn.textContent.trim();
            operation = 'divide';
            operationChosen = true;
            break;
        case 'multiply':
            userInput.textContent += btn.textContent.trim();
            operation = 'multiply';
            operationChosen = true;
            break;
        case 'subtract':
            userInput.textContent += btn.textContent.trim();
            operation = 'subtract';
            operationChosen = true;
            break;
        case 'add':
            userInput.textContent += btn.textContent.trim();
            operation = 'add';
            operationChosen = true;
            break;
        default:
            operation = '';
            operationChosen = false;
            break;
    }
}));

function calculate(operator, resultFunc) {
    return (
    operationPosition = userInput.textContent.search(`\\${operator}`),
    firstOperand = parseFloat(userInput.textContent.slice(0, operationPosition)),
    secondOperand = parseFloat(userInput.textContent.slice(operationPosition + 1,)),
    result = resultFunc(firstOperand, secondOperand),
    userInput.textContent = result,
    firstOperand = result,
    secondOperand = '',
    operation = '',
    operationChosen = false
    );
}

equalBtn.addEventListener('click', () => {
    let operationPosition;

    switch(operation) {
        case 'add':
            calculate('+', add);
            break;
        case 'subtract':
            calculate('-', subtract);
            break;
        case 'multiply':
            calculate('x', multiply);
            break;
        case 'divide':
            calculate('÷', divide);
    }
});

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    if (a < 0 || b < 0) {
        console.log('bth');
    } else {
        return a - b;
    }
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (a == 0 || b == 0) {
        return 'Error';
    } else {
        return a / b;
    }  
}

function operate(operator, a, b) {
    return operator(a, b);
}