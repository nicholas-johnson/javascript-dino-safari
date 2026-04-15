/**
 * Demo: .filter() - keep elements that pass a test.
 * Run: node module-02-functions/demo/01-filter
 */

console.log('\n--- .filter() demo ---\n');

// --- 1. Filter numbers ---
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = numbers.filter((n) => n % 2 === 0);
console.log('Evens:', evens);

// --- 2. Filter with a second array (overlap) ---
const zoneA = [1, 3, 5, 7, 9];
const zoneB = [2, 3, 5, 8, 9];
const shared = zoneA.filter((id) => zoneB.includes(id));
console.log('Shared IDs:', shared);

// --- 3. Filter objects ---
const dinosaurs = [
  { species: 'Tyrannosaurus', zone: 'North', dangerLevel: 9 },
  { species: 'Brachiosaurus', zone: 'Lake', dangerLevel: 1 },
  { species: 'Velociraptor', zone: 'Ridge', dangerLevel: 8 },
  { species: 'Compsognathus', zone: 'South', dangerLevel: 2 },
  { species: 'Allosaurus', zone: 'North', dangerLevel: 7 },
];

const dangerous = dinosaurs.filter((d) => d.dangerLevel > 5);
console.log('\nDangerous dinos (level > 5):');
dangerous.forEach((d) => console.log(` - ${d.species} (${d.dangerLevel})`));

// Key point: filter always returns a NEW array - the original is untouched.
console.log('\nOriginal array length still:', dinosaurs.length);
console.log();
