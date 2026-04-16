// TODO: add type annotations to every parameter and return type.

export const add = (a, b) => a + b;

export const greet = (name) => `Hello, ${name}!`;

export const isAdult = (age) => age >= 18;

export const repeat = (str, times) => str.repeat(times);

export const head = (arr) => arr[0];

export const sum = (numbers) => numbers.reduce((total, n) => total + n, 0);

export const formatDino = (name, species) =>
  `${name} the ${species}`;
