export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export function greet(name) {
  return 'Hello, ' + name + '!';
}

export function isEven(n) {
  return n % 2 === 0;
}

export function initials(first, last) {
  return first[0].toUpperCase() + '.' + last[0].toUpperCase() + '.';
}
