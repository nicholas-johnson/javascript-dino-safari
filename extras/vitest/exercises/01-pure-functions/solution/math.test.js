import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide, clamp, isEven, factorial } from './math.js';

describe('add', () => {
  it('adds two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('handles negative numbers', () => {
    expect(add(-1, -4)).toBe(-5);
  });

  it('adds zero', () => {
    expect(add(7, 0)).toBe(7);
  });
});

describe('subtract', () => {
  it('subtracts two numbers', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  it('returns a negative result', () => {
    expect(subtract(3, 8)).toBe(-5);
  });
});

describe('multiply', () => {
  it('multiplies two numbers', () => {
    expect(multiply(3, 7)).toBe(21);
  });

  it('returns zero when multiplied by zero', () => {
    expect(multiply(99, 0)).toBe(0);
  });

  it('handles negative numbers', () => {
    expect(multiply(-3, 4)).toBe(-12);
  });
});

describe('divide', () => {
  it('divides two numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });

  it('returns a decimal result', () => {
    expect(divide(7, 2)).toBe(3.5);
  });

  it('returns null when dividing by zero', () => {
    expect(divide(5, 0)).toBeNull();
  });
});

describe('clamp', () => {
  it('returns the value when within range', () => {
    expect(clamp(5, 1, 10)).toBe(5);
  });

  it('clamps to the minimum', () => {
    expect(clamp(-3, 0, 10)).toBe(0);
  });

  it('clamps to the maximum', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('returns min when value equals min', () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });
});

describe('isEven', () => {
  it('returns true for even numbers', () => {
    expect(isEven(4)).toBe(true);
  });

  it('returns false for odd numbers', () => {
    expect(isEven(7)).toBe(false);
  });

  it('treats zero as even', () => {
    expect(isEven(0)).toBe(true);
  });

  it('handles negative even numbers', () => {
    expect(isEven(-2)).toBe(true);
  });
});

describe('factorial', () => {
  it('returns 1 for 0', () => {
    expect(factorial(0)).toBe(1);
  });

  it('returns 1 for 1', () => {
    expect(factorial(1)).toBe(1);
  });

  it('computes 5!', () => {
    expect(factorial(5)).toBe(120);
  });

  it('computes 10!', () => {
    expect(factorial(10)).toBe(3628800);
  });
});
