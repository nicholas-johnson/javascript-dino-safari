/**
 * Demo: Function declarations, expressions, arrows, defaults, rest.
 * Run: node module-02-functions/demo/01-function-basics
 */

console.log('\n--- Function basics demo ---\n');

// --- 1. Function declaration ---
function greetRanger(name) {
  return `Welcome to base camp, Ranger ${name}.`;
}
console.log('Declaration:', greetRanger('Ellie'));

// --- 2. Function expression (named) ---
const describeDino = function describeDino(dino) {
  return `${dino.name} - ${dino.species}`;
};
console.log('Expression:', describeDino({ name: 'Rex', species: 'Tyrannosaurus' }));

// --- 3. Arrow functions ---
const double = (n) => n * 2;
const shout = (msg) => `${msg.toUpperCase()}!`;

console.log('Arrow (single expr):', double(21));
console.log('Arrow (string):', shout('perimeter breach'));

const buildAlert = (zone, level) => {
  const tag = level >= 4 ? 'DANGER' : 'OK';
  return `[${tag}] Zone: ${zone}, level: ${level}`;
};
console.log('Arrow (block body):', buildAlert('Raptor Ridge', 5));

// --- 4. Default parameters ---
function formatSighting(name, zone = 'Uncharted', risk = 0) {
  return `${name} @ ${zone} (risk ${risk})`;
}
console.log('\nDefaults (all args):', formatSighting('Bronto', 'Lake', 1));
console.log('Defaults (missing):', formatSighting('Compy'));

// --- 5. Rest parameters ---
function logAll(label, ...items) {
  console.log(`\n${label}:`);
  for (const item of items) {
    console.log(` - ${item}`);
  }
}
logAll('Sectors online', 'North Ridge', 'Cretaceous Valley', 'Raptor Paddock');

// --- 6. Functions as values ---
const ops = { add: (a, b) => a + b, mul: (a, b) => a * b };
console.log('\nFunctions as values:', ops.add(3, 4), ops.mul(3, 4));

function applyToEach(arr, fn) {
  const result = [];
  for (const item of arr) {
    result.push(fn(item));
  }
  return result;
}
const lengths = applyToEach(['Rex', 'Stego', 'Bronto'], (s) => s.length);
console.log('Passed as argument:', lengths);

console.log();
