
// Calculator variables
let firstNumber
let secondNumber
let result
let firstOperation = true

let currentNumber

let operator = null

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
        updateCurrentOperationInput(`You can't divide by zero, duh!`)
        return
    } 
    return a / b
}

const operate = (firstNumber, secondNumber, operator) => {
    return operator(firstNumber, secondNumber)
}

const updateCurrentOperationInput = (text) => {
    // If it's a dot, zero or operator don't add anything
    if (currentOperationInput.textContent == '') {
        if (text == '.' || text == '0' || text == '+' || text == 'x' || text == '-' || text == '÷') {
            return
        }
    }

    if (text == '=') return

    // If there's one dot don't add it again
    if (currentOperationInput.textContent.indexOf('.') != -1 && text == '.') {
        return
    }

    // If there's already an operator don't add it again -> translate current input into previous with the operator and update the value
    if (text == '+' || text == 'x' || text == '-' || text == '÷') {
        firstNumber = Number(currentOperationInput.textContent)
        // If it's first operation, update it with the current input, if not - with the result || if it's the first operation - just make sure there's nothing in the previous
        if (firstOperation) {
            updatePreviousOperationInput(currentOperationInput.textContent + text)
            clearCurrentOperationInput()
            firstOperation = false
        } else {
            updatePreviousOperationInput(result)
            clearCurrentOperationInput()
        }
        
        
        return
    }
 
    currentOperationInput.textContent += text
}

const clearCurrentOperationInput = () => {
    currentOperationInput.textContent = ''
}

const updatePreviousOperationInput = (text) => {

    if (previousOperationInput.textContent == '') {
        if (text == '.' || text == '0' || text == '+' || text == 'x' || text == '-' || text == '÷') {
            return
        }
    } 

    checkForOperator(text)

    

    if (text == '=') return

    // If there's one dot don't add it again
    if (previousOperationInput.textContent.indexOf('.') != -1 && text == '.') {
        return
    }

    previousOperationInput.textContent = text
}

const checkForOperator = (text) => {
    let regex = /[÷x\-+]/
    let textMatch = text.match(regex)
    console.log(textMatch)
    if (textMatch != null) {
        updatePreviousOperationInput(previousOperationInput.textContent.replace(textMatch[0], text))
    }
}

const replaceOperator = (operatorSign) => {
    // updatePreviousOperationInput(previousOperationInput.textContent.replace(, operatorSign))
}

const performCalculation = (operatorSign) => {
    secondNumber = Number(currentOperationInput.textContent)
    result = operate(firstNumber, secondNumber, operator)
    firstNumber = result
    if (operatorSign != undefined) {
        updatePreviousOperationInput(result + operatorSign.textContent)
    } else {
        updatePreviousOperationInput(result)
    }
    clearCurrentOperationInput()
}

calculatorOperands.forEach(operand => {
    operand.addEventListener('click', () => {
        updateCurrentOperationInput(operand.textContent)
    })
})

calculatorOperators.forEach(operatorSign => {

    operatorSign.addEventListener('click', () => {

        switch (operatorSign.textContent) {
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

        if (firstOperation) {
            updateCurrentOperationInput(operatorSign.textContent)
        } else {
            // consider a case when the user pressed equal and when they just keep clicking through operations
            // when equal the currentOperationField will be empty
            if (currentOperationInput.textContent == '') {
                updatePreviousOperationInput(previousOperationInput.textContent + operatorSign.textContent)
            } else {
                performCalculation(operatorSign)
            }
        }
        
        console.log(`First number: ${firstNumber}`)
        console.log(`Second number: ${secondNumber}`)
        console.log(`Operator: ${operator}`)

    })
})

equals.addEventListener('click', () => {
    performCalculation()
})