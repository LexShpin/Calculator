
// Calculator variables
let firstNumber = null
let secondNumber = null
let result = null
let firstOperation = true

let operator = null
let previousOperator = null

// Document elements
const calculatorOperators = document.querySelectorAll('.calculator__operator')
const calculatorOperands = document.querySelectorAll('.calculator__operand')
const previousOperationInput = document.querySelector('.previous-operation')
const currentOperationInput = document.querySelector('.current-operation')
const clearBtn = document.getElementById('clear-btn')
const deleteBtn = document.getElementById('delete-btn')

// operators
const xOperatorBtn = document.querySelector('.x-operator')
const plusOperatorBtn = document.querySelector('.plus-operator')
const minusOperatorBtn = document.querySelector('.minus-operator')
const divisionOperatorBtn = document.querySelector('.division-operator')
const equalsBtn = document.getElementById('equals')

console.log(0 == null);

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
        alert("You can't divide by zero!")
        return
    } 
    return a / b
}

const operate = (firstNumber, secondNumber, operator) => {
    return operator(firstNumber, secondNumber)
}

const updateCurrentOperationInput = (text) => {

    if (currentOperationInput.textContent == '0') {
        if (text == '+' || text == 'x' || text == '-' || text == '÷') {
            // do nothing
        } else if (text == '0') {
            currentOperationInput.textContent = ''
        } else if (text == '.') {
            currentOperationInput.textContent += text
        } else {
            currentOperationInput.textContent = ''
        }
    }

    if (result != null && operator == null && !firstOperation) return

    if (text == '=') return

    // If there's one dot don't add it again
    if (currentOperationInput.textContent.indexOf('.') != -1 && text == '.') return

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

const resetCurrentOperationInput = () => {
    currentOperationInput.textContent = '0'
}

const removeLastSymbolFromCurrentOperationInput = () => {
    if (currentOperationInput.textContent == '0') return
}

const updatePreviousOperationInput = (text) => {

    if (previousOperationInput.textContent == '') {
        if (text == '.' || text == '0' || text == '+' || text == 'x' || text == '-' || text == '÷') {
            return
        }
    }

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

    return textMatch
}

const replaceOperator = (currentOperator, newOperator) => {
    updatePreviousOperationInput(previousOperationInput.textContent.replace(currentOperator, newOperator))
}

const performCalculation = (operatorSign, operator) => {
    secondNumber = Number(currentOperationInput.textContent)
    result = operate(firstNumber, secondNumber, operator)
    if (result % 1 != 0) {
        result = Number(result.toFixed(2))
    }
    firstNumber = Number(result)
    updatePreviousOperationInput(result + operatorSign)
    clearCurrentOperationInput()
}

const resetCalculator = () => {
    firstNumber = 0
    secondNumber = 0
    result = 0
    firstOperation = true
    operator = null
    previousOperator = null
    resetCurrentOperationInput()
    updatePreviousOperationInput('')
}

const handleOperators = (operatorSign) => {
    switch (operatorSign.textContent) {
        case '+':
            previousOperator = operator
            operator = add
            break
        case '-':
            previousOperator = operator
            operator = subtract
            break
        case '÷':
            previousOperator = operator
            operator = divide
            break
        case 'x':
            previousOperator = operator
            operator = multiply
            break
    }

    if (firstOperation) {
        updateCurrentOperationInput(operatorSign.textContent)
    } else {
        // consider a case when the user pressed equal and when they just keep clicking through operations
        // when equal the currentOperationField will be empty
        if (currentOperationInput.textContent == '') {
            // Replace the operator if thjere's already one here
            // If there isn't, just append one
            let currentOperator = checkForOperator(previousOperationInput.textContent)
            if (currentOperator == null) {
                updatePreviousOperationInput(previousOperationInput.textContent + operatorSign.textContent)
            } else {
                replaceOperator(currentOperator, operatorSign.textContent)
            }
            
        } else {
            // debugger
            // If the operator sign is the same, just perform the calculation (happens now)
            // If the operator is different, first perform the calculation with the current sign, then add another sign to the next previousInput with result
            if (previousOperator == operator) {
                performCalculation(operatorSign.textContent, operator)
            } else {
                performCalculation(operatorSign.textContent, previousOperator)
            }
            
        }
    }
}

const handleEqualsOperator = () => {
    if (operator == null) {
        return
    }

    performCalculation('', operator)
    updatePreviousOperationInput(result)
    clearCurrentOperationInput()
    operator = null
}

calculatorOperands.forEach(operand => {
    operand.addEventListener('click', () => {
        updateCurrentOperationInput(operand.textContent)
    })
})

calculatorOperators.forEach(operatorSign => {

    console.log(operatorSign)

    operatorSign.addEventListener('click', () => {

        handleOperators(operatorSign)
    })
})

document.addEventListener('keydown', e => {
    console.log(e.key)

    e.preventDefault()

    if (e.key >= 0 && e.key <= 9) {
        updateCurrentOperationInput(e.key)
    }

    switch (e.key) {
        case '.':
            updateCurrentOperationInput(e.key)
            break
        case 'Backspace':
            removeLastSymbolFromCurrentOperationInput()
            break
        case 'x':
            handleOperators(xOperatorBtn)
            break
        case '/':
            handleOperators(divisionOperatorBtn)
            break
        case '+':
            handleOperators(plusOperatorBtn)
            break
        case '-':
            handleOperators(minusOperatorBtn)
            break
        case 'Enter':
        case '=':
            handleEqualsOperator()
            break
        default:
            break
    }

})

equalsBtn.addEventListener('click', () => {
    handleEqualsOperator()    
})

deleteBtn.addEventListener('click', () => {
    // remove the symbol from the current input and update the value of the first / second number?
    updateCurrentOperationInput()
})

clearBtn.addEventListener('click', () => {
    resetCalculator()
})