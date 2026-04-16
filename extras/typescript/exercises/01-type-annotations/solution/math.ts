export const add = (a: number, b: number): number => a + b;

export const greet = (name: string): string => `Hello, ${name}!`;

export const isAdult = (age: number): boolean => age >= 18;

export const repeat = (str: string, times: number): string => str.repeat(times);

export const head = (arr: number[]): number | undefined => arr[0];

export const sum = (numbers: number[]): number =>
  numbers.reduce((total, n) => total + n, 0);

export const formatDino = (name: string, species: string): string =>
  `${name} the ${species}`;
