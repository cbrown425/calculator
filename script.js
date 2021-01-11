//check for double dots //seperate negative symbol from number string  
// SECONDNUM only works with single digit numbers
var inputBox = '';
var lastOperation = '';
var operatorArray = {'+':'op-plus', '-':'op-minus', '/':'op-divide', '*':'op-x', 
'.':'decimal', 'Clear':'clear', 'Delete':'clear'};
var operationText = document.querySelector("#display-operation"); // shows previous operation on display
var displayText = document.querySelector("#display");
var negativeText = document.querySelector("#negative");
var isNegative = null;
var firstNum = null;
var secondNum = null;
var operator = null;
var calculating = false;
var currentNumber = 0; 

//FUNCTIONS 
function calculate() {
    calculating = false;
    if(firstNum !== null && secondNum !== null) {
    lastOperation = `${firstNum} ${operator} ${secondNum}`
    operationText.textContent = lastOperation;
    }
    console.log("firstNum= " + firstNum + " " + "secondNum= " + secondNum + " " + "Operator= " + operator);
    console.log(firstNum + " " + secondNum);
    switch(operator) {
        case "+":
            displayText.textContent = add();
            fontSize(displayText.textContent);
            break;
        case "×":
            displayText.textContent = multiply();
            fontSize(displayText.textContent);
            break;
        case "-":
            displayText.textContent = subtract();
            fontSize(displayText.textContent);
            break;        
        case "÷":
            displayText.textContent = divide();
            fontSize(displayText.textContent);
            break; 
        case "x2":
            lastOperation = `${firstNum} ${operator}`
            operationText.textContent = lastOperation;
            displayText.textContent = square();
            fontSize(displayText.textContent);
            break;
        case "√":
            lastOperation = `${firstNum} ${operator}`
            operationText.textContent = lastOperation;
            displayText.textContent = squareRoot();
            fontSize(displayText.textContent);
            break;
        case "%":
            display.textContent = percentage();
            fontSize(displayText.textContent);
            break;
        case "1/x":
            lastOperation = `1 / (${firstNum})`
            operationText.textContent = lastOperation;
            display.textContent = divideByOne();  
            fontSize(displayText.textContent);     
        } 
}
function add() { // move all these functions to calculate switch statements
    var result = (+firstNum + +secondNum);
    firstNum = result;
    return result;
}
function subtract() {
    var result = firstNum - secondNum;
    firstNum = result;
    return result;
}
function multiply() {
    var result = firstNum * secondNum;
    firstNum = result;
    return result;
}
function divide() {
    var result = firstNum / secondNum;
    firstNum = result;
    return result;
}
function exponent() {
    return firstNum + secondNum;
}
function square() {
    var result = firstNum * firstNum;
    firstNum = result;
    return result;
}
function squareRoot() {
    return Math.sqrt(firstNum);
}
function percentage() {
    return; 
}
function divideByOne () {
    return 1 / firstNum;
}
function negative() { // not finished
    if(isNegative == true) {
        displayText.textContent = displayText.textContent.slice(1);
        isNegative = false;
    }
    else {
        displayText.textContent = "-" + displayText.textContent;
        isNegative = true;
    }
}
function fontSize(input) {
    let size = input.length;
    console.log("INPUT: " + input + " " + "SIZE: " + size);
    if(size < 10) {
        displayText.style.fontSize = "45px";
        console.log(displayText.style.fontSize);
    }
    else {
        var computedSize = `${50 - (size + 5)}px`;
        console.log(computedSize);
        displayText.style.fontSize = computedSize;
    }
}
function clear() {
    displayText.textContent = '0';
    operationText.textContent = '';
    lastOperation = '';
    firstNum = null;
    secondNum = null;
    operator = null;
    calculating = false;
    isNegative = false;
    inputBox = '';
}
function clearDisplay() {
    lastOperation = '';
    inputBox = '';
    displayText.textContent = '';
}

//need to reformat-- no need for foreach when there is only one element with the selected value
document.querySelectorAll("#clear").forEach(e => e.addEventListener("click",
() => {
    clearDisplay();
    clear();
    fontSize(displayText.textContent);
}))
document.querySelectorAll("#op-backspace").forEach(e => e.addEventListener("click",
() => {
    if(calculating == true || secondNum == null) {
        inputBox = inputBox.slice(0, -1);
        displayText.textContent = inputBox;
        secondNum == null;
    }
}))
document.querySelectorAll("#clearInput").forEach(e => e.addEventListener("click",
() => {
    if(calculating == true || secondNum == null) {
        inputBox = '';
        displayText.textContent = inputBox;
        secondNum = inputBox;
    }
}))

document.querySelectorAll(".decimal").forEach(e => e.addEventListener("click",
() => {
    var decimal = false;
    for(i = 0; i < inputBox.length; i++) {
        if(inputBox[i] == '.') {
            decimal = true;
        }
    }
    if(decimal !== true) {
        inputBox += e.textContent;
        displayText.textContent = inputBox;
    }
}))
//NUMBER SELECTION 
document.querySelectorAll(".num").forEach(e => e.addEventListener("click", 
 () => {
    if(inputBox.length >= 18) { 
        if(operator == null || operator == '') { 
            return;
        }
    }
     console.log(".num" + " " + firstNum + " " +  secondNum );
    if(calculating == false && secondNum !== null) {
        console.log(firstNum + "wtf " + secondNum);
        clearDisplay();
        calculating = true;
        inputBox += e.textContent;
        displayText.textContent = inputBox;
        console.log(secondNum);
        console.log('1');
        secondNum = inputBox;
        fontSize(inputBox);
    }
    else if(calculating == true) {
        inputBox += e.textContent;
        displayText.textContent = inputBox;
        secondNum = inputBox;
        fontSize(inputBox);
    }
    else {
        console.log("2 " + calculating + " " + secondNum);
        inputBox += e.textContent;
        displayText.textContent = inputBox;
        console.log('2');
        fontSize(inputBox);
    }
  }));
//OPERATOR SELECTION
  document.querySelectorAll(".operator").forEach(e => e.addEventListener("click", 
 () => {
     console.log("CALCULATE " + inputBox);
    if(calculating) {
        calculate();
     }
    operator = e.textContent;
    if(operator == "x2" || operator == "√" || operator == "1/x") {
        firstNum = displayText.textContent;
        calculate();
    }
     else {
        firstNum = displayText.textContent;
        lastOperation = `${firstNum} ${operator}`
        operationText.textContent = lastOperation;
        secondNum = "";
     }
 }));
 //KEYBOARD INPUT
 document.addEventListener("keydown", event => {
    if (event.isComposing || event.key === 229) {
      return;
    }
    else if (event.key === "Enter") {
        event.preventDefault();
        var button = document.getElementById("equal-button")
        button.click();
        button.classList.add('js-button-equals');
        
    }
    for (i=0; i <= 9; i++) { //key press 0-9
        if(event.key == i) {
            var button = document.getElementById(`num-${i}`);
            button.click()
            button.classList.add('js-button');
            return;
    }
}
        for(const element in operatorArray) {
            if(element == event.key) {
                var button = document.getElementById(`${operatorArray[element]}`);
                button.click();
                button.classList.add('js-button');
        }
    }
 });
 //REMOVING BUTTON STYLING WHEN KEY IS LIFTED
 document.addEventListener("keyup", event => { 
    if (event.key === "Enter") {
        var button = document.getElementById("equal-button");
        button.classList.remove('js-button-equals');
    }
    for (i=0; i <= 9; i++) { //key press 0-9
        if(event.key == i) {
            var button = document.getElementById(`num-${i}`);
            button.classList.remove('js-button');
            return;
    }
}
for(const element in operatorArray) {
    if(element == event.key) {
        var button = document.getElementById(`${operatorArray[element]}`);
        button.classList.remove('js-button');
}
}
 })
