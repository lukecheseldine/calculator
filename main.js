// TODO: don't let the user put in leading zeroes

const display = document.getElementById('display');

const digits = Array.from(document.getElementById('digits').childNodes)
                    .filter((element) => element.nodeName == "BUTTON");
digits.forEach((button) => button.addEventListener('click', processDigit))

const operators = Array.from(document.getElementById('operators').childNodes)
                       .filter((element) => element.nodeName == "BUTTON");
operators.forEach((button) => button.addEventListener('click', processOperator))

const equals = document.getElementById('equals');
equals.addEventListener('click', processEquals);

const clear = document.getElementById('clear');
clear.addEventListener('click', clearAll);

const operatorLookupTable = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide
}

let num1 = null;
let num2 = null;
let operation = null;


function processDigit(e) {
    
    if (num1 == null && num2 == null && operation == null) {
        num1 = e.target.innerText;
        populateDisplay(e.target.innerText);
    }
    else if (num1 != null && num2 == null && operation == null) {
        num1 += e.target.innerText;
        populateDisplay(e.target.innerText);
    }
    else if (num1 != null && num2 == null && operation != null) {
        num2 = e.target.innerText;
        clearDisplay();
        populateDisplay(e.target.innerText);

    }
    else if (num1 != null && num2 != null && operation != null) {
        num2 += e.target.innerText;
        populateDisplay(e.target.innerText);
    }
    else console.log('something wrong with logic in processDigit()');
}

function processOperator(e) {
    clearDisplay()
    // implicit '=' to account for chained operations
    if (operation != null) {
        calculate();
        operation = operatorLookupTable[e.target.innerText];
    }
    else {
        operation = operatorLookupTable[e.target.innerText];
    }
}

function processEquals(e) {
    calculate()
}

function calculate() {
    // user did not supply an operator
    if (operation == null) {
        alert("Please supply an operator");
        return;
    }
    // user divided by zero
    else if (operation == divide && num2 == 0) {
        alert("Cannot divide by zero");
        clearAll();
        return;
    }
    else {
        result = operate(operation, num1, num2);
        clearAll()
        populateDisplay(result);
        num1 = result;
    }
}

function clearAll() {
    num1 = null;
    num2 = null;
    operation = null;
    clearDisplay();
}

function clearDisplay() {
    display.innerText = '';
}

function populateDisplay(text) {
    // if the display is currently empty, i.e. first digit
    if (!display.innerText) display.innerText = text;
    else display.innerText += text;
}

function operate(operator, a, b) {
    return operator(a, b);
}

function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return +a - +b;
}

function multiply(a, b) {
    return +a * +b;
}

function divide(a, b) {
    return +a / +b;
}

