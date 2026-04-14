/**
 * Demo: variables, loops, and console output (no imports - runnable anywhere).
 * Run: node module-01-modern-javascript/demo/02-syntax-fundamentals
 *
 * Good first file for anyone new to JS: const vs let, iterating collections,
 * and printing to the terminal.
 */

console.log('\n--- Syntax fundamentals ---\n');

// const: bind once; the binding can't be reassigned (objects can still mutate).
const sectorName = 'Cretaceous Valley';
const rangersOnDuty = ['Ellie', 'Alan', 'Ian'];

// let: use when you will reassign (counters, tallies, rolling state).
let checkInsLogged = 0;

console.log('Sector:', sectorName);
console.log('Shift size:', rangersOnDuty.length, 'rangers');

// for...of - loop over iterable values (here: each name in the array).
console.log('\nRoll call:');
for (const name of rangersOnDuty) {
  console.log('  •', name, '- present');
  checkInsLogged += 1;
}

// Classic for - index-aware loops (start; condition; step).
console.log('\nFence sensor sweep (passes):');
for (let pass = 1; pass <= 3; pass += 1) {
  console.log('  Pass', pass, 'of 3 - no breaches');
}

// while - repeat while a condition holds.
let pingsRemaining = 3;
console.log('\nRadio check:');
while (pingsRemaining > 0) {
  console.log('  ... awaiting ping', pingsRemaining);
  pingsRemaining -= 1;
}
console.log('  Copy - loud and clear');

console.log('\nTotal check-ins logged:', checkInsLogged);
console.log('(Try editing the arrays and loops, then run this file again.)\n');
