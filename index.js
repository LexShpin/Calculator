const userInput = document.querySelector('.user-input');
const resultField = document.querySelector('.result-field');

const clearBtn = document.querySelector('.clear-btn');
const deleteBtn = document.querySelector('.delete-btn');

const calculatorBtns = document.querySelectorAll('.calculator-btn');

let firstOperand;
let secondOperand;
let operation;
let result;

clearBtn.addEventListener('click', () => {
    userInput.textContent = '';
    firstOperand = 0;
    secondOperand = 0;
    result = 0;
});

deleteBtn.addEventListener('click', () => {
    let str = userInput.textContent.split('');
    str.pop();
    userInput.textContent = str.join('');
    if (userInput.textContent == '') {
        userInput.textContent = '0';
    }
});

calculatorBtns.forEach(btn => btn.addEventListener('click', (e) => {
    // console.log(e.target.textContent);
    userInput.textContent += e.target.textContent.trim();
}));



function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b);
}