export const add = (a, b) => a + b;

export const subtract = (a, b) => a - b;

export const multiply = (a, b) => a * b;

export const divide = (a, b) => (b === 0 ? null : a / b);

export const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max);

export const isEven = (n) => n % 2 === 0;

export const factorial = (n) => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};
