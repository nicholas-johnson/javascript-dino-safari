import { sortNumbers, sortByDanger, sortByName } from './sorters.js';

const numbers = [10, 1, 21, 2, -5, 0];
console.log('sortNumbers:', sortNumbers(numbers));

const dinos = [
  { species: 'Compy', dangerLevel: 2 },
  { species: 'Rex', dangerLevel: 9 },
  { species: 'Raptor', dangerLevel: 7 },
  { species: 'Bronto', dangerLevel: 1 },
];

console.log('sortByDanger:', sortByDanger(dinos));
console.log('sortByName:', sortByName(dinos));
