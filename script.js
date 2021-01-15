var operationText = document.querySelector("#display-operation");
var displayText = document.querySelector("#display");
var negativeText = document.querySelector(".negative");
var equalsButton = document.getElementById("equal-button");
var operatorArray = {'+':'op-plus', '-':'op-minus', '/':'op-divide', 
'*':'op-x', '.':'decimal', 'Clear':'clear', 'Delete':'clear'};
var darkModeEnabled = false;
var inputBox = '';
var lastOperation = '';
var isNegative = null;
var firstNum = null;
var secondNum = null;
var operator = null;
var calculating = false;
var lengthLimit = false;
var currentNumber = 0; 

function calculate() {
    calculating = false;
    if(firstNum !== null && secondNum !== null) {
    lastOperation = `${firstNum} ${operator} ${secondNum}`
    operationText.textContent = lastOperation;
    }
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
function add() { 
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
    if(firstNum == '0' || secondNum == '0') {
        darkMode();
    }
    else {
        var result = firstNum / secondNum;
        firstNum = result;
        return result;
    }
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
    return firstNum * (secondNum / 100); 
}
function divideByOne () {
    return 1 / firstNum;
}
function negative() { 
    if(isNegative == true) {
        displayText.textContent = displayText.textContent.slice(1);
        isNegative = false;
    }
    else {
        inputBox = "-" + displayText.textContent;
        displayText.textContent = "-" + displayText.textContent;
        isNegative = true;
    }
}
function fontSize(input=0, screenType=null) {
    let size = input.length;
    if(window.matchMedia("(max-width: 600px)").matches) {
        if(size < 10 && input == 'mobile') {
            displayText.style.fontSize = "85px";
        }
        else {
            var computedSize = `${75 - (size + 13)}px`;
            displayText.style.fontSize = computedSize;
        }
    }
    else {
        if(size < 10 && input == 'window') {
            displayText.style.fontSize = "45px";
        }
        else {
            var computedSize = `${50 - (size + 5)}px`;
            displayText.style.fontSize = computedSize;
        }
    }
}
function darkMode() {
  if(darkModeEnabled == false) {
    document.querySelectorAll("html").forEach((e) => {
        e.classList.add("html-dark");
    });
    document.querySelectorAll(".container").forEach((e) => {
        e.classList.add("container-dark");
    });
    document.querySelectorAll(".display").forEach((e) => {
        e.classList.add("display-dark");
    });
    document.querySelectorAll(".op-pad").forEach((e) => {
        e.classList.add("operator-dark");
    });
    document.querySelectorAll(".numpad").forEach((e) => {
        e.classList.add("numbers-dark");
    });
    document.querySelectorAll("#equal-button").forEach((e) => {
        e.classList.add("equal-button-dark");
    });
    darkModeEnabled = true;
  }
  else {
    document.querySelectorAll("html").forEach((e) => {
        e.classList.remove("html-dark");
    });
    document.querySelectorAll(".display").forEach((e) => {
        e.classList.remove("display-dark");
    });
    document.querySelectorAll(".container").forEach((e) => {
        e.classList.remove("container-dark");
    });
    document.querySelectorAll(".op-pad").forEach((e) => {
        e.classList.remove("operator-dark");
    });
    document.querySelectorAll(".numpad").forEach((e) => {
        e.classList.remove("numbers-dark");
    });
    document.querySelectorAll("#equal-button").forEach((e) => {
        e.classList.remove("equal-button-dark");
    });
    darkModeEnabled = false;
  }
}
function clear() {
    displayText.textContent = '0';
    operationText.textContent = '';
    lastOperation = '';
    inputBox = '';
    calculating = false;
    isNegative = false;
    firstNum = null;
    secondNum = null;
    operator = null;
}
function clearDisplay() {
    displayText.textContent = '';
    lastOperation = '';
    inputBox = '';
}
//EVENT LISTENERS
document.querySelectorAll("#clear").forEach(e => e.addEventListener("click",
() => {
    clearDisplay();
    clear();
    fontSize(displayText.textContent);
}))
document.querySelectorAll("#op-backspace").forEach(e => e.addEventListener("click",
() => {
    if(inputBox.length == 1 || inputBox.length == 0) {
        inputBox = '';
        display.textContent = "0";
    }
    else {
        inputBox = inputBox.slice(0, -1);
        displayText.textContent = inputBox;
        secondNum == null;
    }
}))
document.querySelectorAll("#clearInput").forEach(e => e.addEventListener("click",
() => {
    if(calculating == true || secondNum == null) {
        inputBox = '';
        displayText.textContent = '0';
        secondNum = inputBox;
    }
}))
document.querySelectorAll("#decimal").forEach(e => e.addEventListener("click",
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
    if(calculating == false && secondNum !== null && inputBox.length < 19) {
        clearDisplay();
        calculating = true;
        inputBox += e.textContent;
        displayText.textContent = inputBox;
        secondNum = inputBox;
        fontSize(inputBox);
        return;
    }
    else if(calculating == true && inputBox.length < 18) {
        inputBox += e.textContent;
        displayText.textContent = inputBox;
        secondNum = inputBox;
        fontSize(inputBox);
        return;
    }
    if(inputBox.length == 18) {
        lengthLimit = true;
        return;
    }
    else {
        inputBox += e.textContent;
        displayText.textContent = inputBox;
        fontSize(inputBox);
    }
  }));
//OPERATOR SELECTION
  document.querySelectorAll(".operator").forEach(e => e.addEventListener("click", 
 () => {
    lengthLimit = false;
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
 //FONT RESIZING 
 window.addEventListener('resize', function() {
    if(window.innerWidth <= 600) {
        fontSize(displayText.textContent, 'mobile');
    }
    else {
        fontSize(displayText.textContent, 'window');
    }
});
 //KEYBOARD INPUT
 document.addEventListener("keydown", event => {
    if (event.isComposing || event.key === 229) {
      return;
    }
    else if (event.key === "Enter") {
        if(!darkMode) {
            event.preventDefault();
            equalsButton.click();
            equalsButton.classList.add('js-button-equals');
            return;
        }
        else {
            event.preventDefault();
            equalsButton.click();
            equalsButton.classList.add('js-button-equals-dark');
        }
        
    }
    for (i=0; i <= 9; i++) {
        if(event.key == i) {
            if(!darkMode) {
                var buttonSelect = document.getElementById(`num-${i}`);
                buttonSelect.click()
                buttonSelect.classList.add('js-button');
                return;
            }
            else {
                var buttonSelect = document.getElementById(`num-${i}`);
                buttonSelect.click()
                buttonSelect.classList.add('js-button-dark');
            }
        }
    }
    for(const element in operatorArray) {
        if(element == event.key) {
            if(!darkMode) {
                var buttonSelect = document.getElementById(`${operatorArray[element]}`);
                buttonSelect.click();
                buttonSelect.classList.add('js-button');
            }
            else {
                var buttonSelect = document.getElementById(`${operatorArray[element]}`);
                buttonSelect.click();
                buttonSelect.classList.add('js-button-dark');  
                }
            }
        }      
    });
 //REMOVING BUTTON STYLING WHEN KEY IS LIFTED
 document.addEventListener("keyup", event => { 
    if (event.key === "Enter") {
        equalsButton.classList.remove('js-button-equals');
        equalsButton.classList.remove('js-button-equals-dark');
    }
    for (i=0; i <= 9; i++) {
        if(event.key == i) {
            var button = document.getElementById(`num-${i}`);
            button.classList.remove('js-button');
            button.classList.remove('js-button-dark');
            return;
    }
}
for(const element in operatorArray) {
    if(element == event.key) {
        var button = document.getElementById(`${operatorArray[element]}`);
        button.classList.remove('js-button');
        button.classList.remove('js-button-dark');
        }
    }
})

