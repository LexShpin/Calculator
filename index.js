const userInput = document.querySelector('.user-input');
const resultField = document.querySelector('.result-field');

const clearBtn = document.querySelector('.clear-btn');
const deleteBtn = document.querySelector('.delete-btn');

const calculatorBtns = document.querySelectorAll('.calculator-btn');

clearBtn.addEventListener('click', () => {
    userInput.textContent = '0';
    firstOperand = 0;
    secondOperand = 0;
    result = 0;
});

// tst

deleteBtn.addEventListener('click', () => {
    let str = userInput.textContent.split('');
    str.pop();
    userInput.textContent = str.join('');
    if (userInput.textContent == '') {
        userInput.textContent = '0';
    }
});

calculatorBtns.forEach(btn => btn.addEventListener('click', () => {
    
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