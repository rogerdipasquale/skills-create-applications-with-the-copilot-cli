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

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a % b;
}

function power(a, b) {
  return Math.pow(a, b);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of negative number');
  }
  return Math.sqrt(n);
}

// Exports for requiring from other modules
module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };

// CLI interface when executed directly
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length !== 2 && args.length !== 3) {
    console.error('Usage:');
    console.error('  node src/calculator.js <number> <operator> <number>');
    console.error('  node src/calculator.js <operator> <number>   (for unary operators like sqrt)');
    console.error('Examples:');
    console.error('  node src/calculator.js 2 + 3');
    console.error('  node src/calculator.js 10 % 3');
    console.error('  node src/calculator.js pow 2 3');
    console.error('  node src/calculator.js sqrt 9');
    process.exit(1);
  }

  try {
    let result;

    if (args.length === 2) {
      // Unary operators: <operator> <number>
      const [operatorRaw, numRaw] = args;
      const operator = operatorRaw.toLowerCase();
      const num = Number(numRaw);
      if (Number.isNaN(num)) {
        console.error('Invalid number input. Please provide a valid numeric value.');
        process.exit(1);
      }

      switch (operator) {
        case 'sqrt':
        case 'squareroot':
          result = squareRoot(num);
          break;
        default:
          console.error('Unsupported unary operator. Supported: sqrt');
          process.exit(1);
      }
    } else {
      // Either: <number> <operator> <number>
      // Or: <operator> <number> <number> (operator first, e.g., pow 2 3)
      const [aRaw, bRaw, cRaw] = args;
      let operatorRaw, left, right;

      if (Number.isNaN(Number(aRaw)) && !Number.isNaN(Number(bRaw))) {
        // operator first form
        operatorRaw = aRaw;
        left = Number(bRaw);
        right = Number(cRaw);
      } else {
        // number operator number form
        left = Number(aRaw);
        operatorRaw = bRaw;
        right = Number(cRaw);
      }

      if (Number.isNaN(left) || Number.isNaN(right)) {
        console.error('Invalid number input. Please provide valid numeric values.');
        process.exit(1);
      }

      const op = operatorRaw;
      switch (op) {
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
        case '%':
        case 'mod':
        case 'MOD':
          result = modulo(left, right);
          break;
        case '**':
        case '^':
        case 'pow':
        case 'power':
          result = power(left, right);
          break;
        default:
          console.error('Unsupported operator. Use one of: + - * / % ** ^ pow sqrt');
          process.exit(1);
      }
    }

    // Print result
    console.log(result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}
