const calculate = (n1, operator, n2) => {
    let result = '';
    if(operator === 'addition'){
        result = parseFloat(n1) + parseFloat(n2);
    }
    else if(operator === 'subtraction'){
        result = parseFloat(n1) - parseFloat(n2);
    }
    else if(operator === 'multiplication'){
        result = parseFloat(n1) * parseFloat(n2);
    }
    else if(operator === 'division'){
        result = parseFloat(n1) / parseFloat(n2);
    }
    return result;
}

const calculator = document.querySelector('.calculator-screen');
const keys = document.querySelector(".keypad-buttons");
const display = document.querySelector(".output-screen");

keys.addEventListener('click', e => {
    if(e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
        // if(!action){
        //     console.log('number key');
        // }
        // if(action === 'addition' || action === 'subtraction' || action === 'multiplication' || action === 'division'){
        //     console.log("operator key");
        // }
        // if(action === 'decimal'){
        //     console.log('decimal key');
        // }
        // if(action === 'clear'){
        //     console.log("clear key");
        // }
        // if(action === 'enter'){
        //     console.log('equal key');
        // }
        if(!action){
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent;
              } else {
                display.textContent = displayedNum + keyContent;
              }
              calculator.dataset.previousKeyType = 'number'
        }
        if(action === 'addition' || action === 'subtraction' || action === 'multiplication' || action === 'division'){
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
            if(firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'enter'){
                const calcValue =calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;
                calculator.dataset.firstValue = calcValue
            }
            else{
                calculator.dataset.firstValue = displayedNum;
            }
            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
        }
        if(action === 'decimal'){
            if(!displayedNum.includes('.')){
                display.textContent = displayedNum + '.';
            }
            else if(previousKeyType === 'operator'){
                display.textContent = '0.';
            }
            calculator.dataset.previousKeyType = 'decimal';
        }
        if(action === 'clear'){
            console.log("clear key");
            calculator.dataset.previousKeyType = 'clear';
        }
        if(action === 'enter'){
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
            if(firstValue){
                display.textContent = calculate(firstValue, operator, secondValue);
            }
            display.textContent = calculate(firstValue, operator, secondValue);
        }
        calculator.dataset.previousKeyType = 'enter';
    }
})