import { keepEvens, overlap, getDangerous } from './filters.js';

console.log('keepEvens([1,2,3,4,5,6]):', keepEvens([1, 2, 3, 4, 5, 6]));
console.log('overlap([1,2,3,4], [3,4,5,6]):', overlap([1, 2, 3, 4], [3, 4, 5, 6]));

const dinos = [
  { species: 'Rex', zone: 'North', dangerLevel: 9 },
  { species: 'Bronto', zone: 'Lake', dangerLevel: 1 },
  { species: 'Raptor', zone: 'Ridge', dangerLevel: 7 },
];
console.log('getDangerous(dinos):', getDangerous(dinos));
