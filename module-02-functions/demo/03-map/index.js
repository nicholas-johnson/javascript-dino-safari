/**
 * Demo: .map() - transform each element into something new.
 * Run: node module-02-functions/demo/03-map
 */

console.log('\n--- .map() demo ---\n');

// --- 1. Map numbers ---
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
console.log('Doubled:', doubled);

// --- 2. Extract a single field ---
const dinosaurs = [
  { species: 'Tyrannosaurus', zone: 'North', dangerLevel: 9 },
  { species: 'Brachiosaurus', zone: 'Lake', dangerLevel: 1 },
  { species: 'Velociraptor', zone: 'Ridge', dangerLevel: 8 },
];

const names = dinosaurs.map((d) => d.species);
console.log('Species names:', names);

// --- 3. Format objects into strings ---
const lines = dinosaurs.map((d) => `${d.species} (${d.zone}) - danger: ${d.dangerLevel}`);
console.log('\nFormatted sightings:');
lines.forEach((line) => console.log(` - ${line}`));

// --- 4. Reshape objects ---
const summary = dinosaurs.map((d) => ({
  name: d.species,
  isLethal: d.dangerLevel > 7,
}));
console.log('\nReshaped:', summary);

// Key point: map always returns a NEW array of the same length.
console.log();
