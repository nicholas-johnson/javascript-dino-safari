import { sum, countByZone, maxDanger } from './reducers.js';

const numbers = [1, 2, 3, 4, 5];
console.log('sum:', sum(numbers));

const dinos = [
  { species: 'Rex', zone: 'North', dangerLevel: 9 },
  { species: 'Raptor', zone: 'North', dangerLevel: 7 },
  { species: 'Bronto', zone: 'Lake', dangerLevel: 1 },
  { species: 'Compy', zone: 'South', dangerLevel: 2 },
];

console.log('countByZone:', countByZone(dinos));
console.log('maxDanger:', maxDanger(dinos));
