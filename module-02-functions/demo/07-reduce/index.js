/**
 * Demo: .reduce() - fold an array into a single value.
 * Run: node module-02-functions/demo/07-reduce
 */

console.log('\n--- .reduce() demo ---\n');

// --- 1. Sum numbers ---
const numbers = [3, 7, 2, 8];
const total = numbers.reduce((acc, n) => acc + n, 0);
console.log('Sum:', total);

// --- 2. Count items by category ---
const dinosaurs = [
  { species: 'Rex', zone: 'North' },
  { species: 'Raptor', zone: 'North' },
  { species: 'Bronto', zone: 'Lake' },
  { species: 'Stego', zone: 'Lake' },
  { species: 'Compy', zone: 'South' },
];

const countByZone = dinosaurs.reduce((acc, d) => {
  acc[d.zone] = (acc[d.zone] ?? 0) + 1;
  return acc;
}, {});
console.log('Count by zone:', countByZone);

// --- 3. Find a maximum ---
const withDanger = [
  { species: 'Compy', dangerLevel: 2 },
  { species: 'Rex', dangerLevel: 9 },
  { species: 'Raptor', dangerLevel: 7 },
];

const mostDangerous = withDanger.reduce((best, d) =>
  d.dangerLevel > best.dangerLevel ? d : best,
);
console.log('\nMost dangerous:', mostDangerous);

// Walk through the accumulator for countByZone:
console.log('\n--- Accumulator step by step ---');
dinosaurs.reduce((acc, d, i) => {
  acc[d.zone] = (acc[d.zone] ?? 0) + 1;
  console.log(`  Step ${i}: acc =`, JSON.stringify(acc));
  return acc;
}, {});

console.log();
