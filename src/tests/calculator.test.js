const calc = require('../calculator');

describe('Extended calculator operations', () => {
  describe('modulo(a, b)', () => {
    test('5 % 2 -> 1', () => {
      expect(calc.modulo(5, 2)).toBe(1);
    });

    test('5.5 % 2 -> 1.5 (floating)', () => {
      expect(calc.modulo(5.5, 2)).toBeCloseTo(1.5);
    });

    test('modulo by zero throws', () => {
      expect(() => calc.modulo(5, 0)).toThrow('Division by zero');
    });
  });

  describe('power(a, b)', () => {
    test('2 ** 3 -> 8', () => {
      expect(calc.power(2, 3)).toBe(8);
    });

    test('2 ** -1 -> 0.5 (negative exponent)', () => {
      expect(calc.power(2, -1)).toBeCloseTo(0.5);
    });

    test('0 ** 0 -> 1 (edge case)', () => {
      expect(calc.power(0, 0)).toBe(1);
    });
  });

  describe('squareRoot(n)', () => {
    test('sqrt(16) -> 4', () => {
      expect(calc.squareRoot(16)).toBe(4);
    });

    test('sqrt(0) -> 0', () => {
      expect(calc.squareRoot(0)).toBe(0);
    });

    test('sqrt negative -> throws error', () => {
      expect(() => calc.squareRoot(-9)).toThrow('Square root of negative number');
    });
  });
});
