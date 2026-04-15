import { doubleAll, extractNames, formatSightings } from './mappers.js';

const numbers = [1, 2, 3, 4, 5];
console.log('doubleAll:', doubleAll(numbers));

const dinos = [
  { species: 'Rex', zone: 'North', dangerLevel: 9 },
  { species: 'Compy', zone: 'South', dangerLevel: 2 },
  { species: 'Bronto', zone: 'Lake', dangerLevel: 1 },
];

console.log('extractNames:', extractNames(dinos));
console.log('formatSightings:', formatSightings(dinos));
