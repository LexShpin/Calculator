
// Calculator variables
let firstNumber
let secondNumber
let operator

const operators = ['+', '-', 'x', '÷']

// Document elements
const calculatorOperators = document.querySelectorAll('.calculator__operator')
const calculatorOperands = document.querySelectorAll('.calculator__operand')
const equals = document.getElementById('equals')
const previousOperationInput = document.querySelector('.previous-operation')
const currentOperationInput = document.querySelector('.current-operation')
const clearBtn = document.getElementById('clear-btn')
const deleteBtn = document.getElementById('delete-btn')

const add = (a, b) => {
    return a + b
}

const subtract = (a, b) => {
    return a - b
}

const multiply = (a, b) => {
    return a * b
}

const divide = (a, b) => {
    if (a == 0 || b == 0) {
        // Display a message that it's wrong!
        return
    } 
    return a / b
}

const operate = (firstNumber, secondNumber, operator) => {
    operator(firstNumber, secondNumber)
}

const updateCurrentOperationInput = (text) => {
    let usingOperator

    // If it's a dot, zero or operator don't add anything
    if (currentOperationInput.textContent == '') {
        if (text == '.' || text == '0' || text == '+' || text == 'x' || text == '-' || text == '÷') {
            return
        }
    }

    // If there's one dot don't add it again
    if (currentOperationInput.textContent.indexOf('.') != -1 && text == '.') {
        return
    }

    // If there's already an operator don't add it again
    // if ()

    currentOperationInput.textContent += text
}

const clearCurrentOperationInput = () => {
    currentOperationInput.textContent = ''
}

const updatePreviousOperationInput = (text) => {
    previousOperationInput = text
}

calculatorOperands.forEach(operand => {
    operand.addEventListener('click', () => {
        updateCurrentOperationInput(operand.textContent)
    })
})

calculatorOperators.forEach(operatoSign => {
    operatoSign.addEventListener('click', () => {
        switch (operatoSign.textContent) {
            case '+':
                operator = add
                break
            case '-':
                operator = subtract
                break
            case '÷':
                operator = divide
                break
            case 'x':
                operator = multiply
                break
        }

        updateCurrentOperationInput(operatoSign.textContent)
    })
})

equals.addEventListener('click', () => {
    let result = operate(firstNumber, secondNumber, operator)
    clearCurrentOperationInput()
    updateCurrentOperationInput(result)
})