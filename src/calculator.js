#!/usr/bin/env node

/*
 Calculator (calculator.js)

 Supports the following basic arithmetic operations:
 - addition (+)
 - subtraction (-)
 - multiplication (*)
 - division (/)

 Usage (CLI):
   node src/calculator.js 2 + 3
   node src/calculator.js 10 - 4

 The module also exports functions: add, subtract, multiply, divide
*/

// Core operation functions
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
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

// Exports for requiring from other modules
module.exports = { add, subtract, multiply, divide };

// CLI interface when executed directly
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length !== 3) {
    console.error('Usage: node src/calculator.js <number> <operator> <number>');
    console.error('Example: node src/calculator.js 2 + 3');
    process.exit(1);
  }

  const [leftRaw, operator, rightRaw] = args;
  const left = Number(leftRaw);
  const right = Number(rightRaw);

  if (Number.isNaN(left) || Number.isNaN(right)) {
    console.error('Invalid number input. Please provide valid numeric values.');
    process.exit(1);
  }

  try {
    let result;
    switch (operator) {
      case '+':
        result = add(left, right);
        break;
      case '-':
        result = subtract(left, right);
        break;
      case '*':
      case 'x':
      case 'X':
        result = multiply(left, right);
        break;
      case '/':
        result = divide(left, right);
        break;
      default:
        console.error('Unsupported operator. Use one of: + - * /');
        process.exit(1);
    }

    // Print result
    console.log(result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}
