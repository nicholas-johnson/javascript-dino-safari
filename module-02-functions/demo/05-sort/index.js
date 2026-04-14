/**
 * Demo: .sort() — order elements with a comparator function.
 * Run: node module-02-functions/demo/05-sort
 */

console.log('\n--- .sort() demo ---\n');

// --- 1. The gotcha: default sort is lexicographic ---
const nums = [10, 1, 21, 2];
console.log('Default sort (wrong!):', [...nums].sort());
console.log('Numeric sort (right):', [...nums].sort((a, b) => a - b));

// --- 2. Sort objects by a numeric field ---
const dinosaurs = [
  { species: 'Compsognathus', dangerLevel: 2 },
  { species: 'Tyrannosaurus', dangerLevel: 9 },
  { species: 'Velociraptor', dangerLevel: 7 },
  { species: 'Brachiosaurus', dangerLevel: 1 },
];

const byDangerDesc = [...dinosaurs].sort((a, b) => b.dangerLevel - a.dangerLevel);
console.log('\nBy danger (highest first):');
byDangerDesc.forEach((d) => console.log(` - ${d.species}: ${d.dangerLevel}`));

// --- 3. Sort objects alphabetically ---
const byName = [...dinosaurs].sort((a, b) => a.species.localeCompare(b.species));
console.log('\nBy name (A-Z):');
byName.forEach((d) => console.log(` - ${d.species}`));

// Key point: .sort() MUTATES the array. Use spread [...arr] to sort a copy.
console.log('\nOriginal order preserved?', dinosaurs[0].species, '(yes, we spread first)');
console.log();
