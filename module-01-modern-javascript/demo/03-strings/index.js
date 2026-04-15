/**
 * Demo: String manipulation - the everyday toolkit.
 * Run: node module-01-modern-javascript/demo/03-strings
 */

console.log('\n--- String manipulation demo ---\n');

// --- 1. Template literals ---
const species = 'Velociraptor';
const zone = 'Raptor Ridge';
console.log(`Sighting: ${species} in ${zone}`);

// --- 2. Length and case ---
const sector = '  Cretaceous Valley  ';
console.log('Original:  ', JSON.stringify(sector));
console.log('Trimmed:   ', JSON.stringify(sector.trim()));
console.log('Uppercase: ', sector.trim().toUpperCase());
console.log('Lowercase: ', sector.trim().toLowerCase());
console.log('Length:    ', sector.trim().length);

// --- 3. Searching ---
const log = 'Rex spotted near north fence at 14:32';
console.log('\nLog:', log);
console.log('Includes "Rex"? ', log.includes('Rex'));
console.log('Includes "Bronto"?', log.includes('Bronto'));
console.log('Starts with "Rex"?', log.startsWith('Rex'));
console.log('Index of "north": ', log.indexOf('north'));

// --- 4. Extracting parts ---
console.log('\nSlice(0, 3):', log.slice(0, 3));
console.log('Slice(17):  ', log.slice(17));

// --- 5. Splitting and joining ---
const csv = 'Rex,Raptor,Bronto,Stego';

const names = csv.split(',');
console.log('\nSplit CSV: ', names);
console.log('Joined:    ', names.join(' | '));

// --- 6. Replacing ---
const alert = 'DANGER: Rex in zone-a, Rex near fence';
console.log('\nOriginal:', alert);
console.log('Replace first:', alert.replace('Rex', 'T-Rex'));
console.log('Replace all:  ', alert.replaceAll('Rex', 'T-Rex'));

console.log();
