
let total = 0;
let count = '0'; // Inicializamos count como una cadena en lugar de un número
let previousOperator = null; // Inicializamos previousOperator como null

const screen = document.querySelector('.screen');

function buttonClick(value) {
  if (isNaN(value)) {
    // No es un número
    handleSymbol(value);
  } else {
    // Número
    handleNumber(value);
  }
  //asigna
  screen.innerText = count;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case 'C':
      count = '0'; // Cambiamos count a '0' en lugar de 0
      break;
    case '=':
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(count));
      previousOperator = null;
      count = total.toString(); // Convertimos total a cadena antes de asignarlo a count
      total = 0;
      break;
    case '←':
      if (count.length === 1) {
        count = '0'; // Cambiamos count a '0' si solo queda un dígito
      } else {
        count = count.substring(0, count.length - 1);
      }
      break;
    case '+':
    case '-':
    case '×':
    case '÷':
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (count === '0') {
    return;
  }
  const intCount = parseInt(count);

  if (total === 0) {
    total = intCount;
  } else {
    flushOperation(intCount);
  }
  previousOperator = symbol;
  count = '0'; // Cambiamos count a '0' después de manejar el operador
}

function flushOperation(intCount) {
  if (previousOperator === '+') {
    total += intCount;
  } else if (previousOperator === '-') {
    total -= intCount;
  } else if (previousOperator === '×') {
    total *= intCount;
  } else {
    total /= intCount;
  }
}

function handleNumber(numberString) {
  if (count === '0' || count === 'Infinity') {
    count = numberString;
  } else {
    count += numberString;
  }
}

function init() {
  document.querySelectorAll('.boton-calc').forEach((button) => {
    button.addEventListener('click', function (event) {
      buttonClick(event.target.innerText);
    });
  });
}

init();

//ALEX RIVAS
