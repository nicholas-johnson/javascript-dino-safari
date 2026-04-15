/**
 * Demo: Intentionally buggy code - use the debugger to find the problem.
 *
 * Run normally (you'll see a wrong answer):
 *   node module-01-modern-javascript/demo/08-debugging
 *
 * Run with the debugger:
 *   node --inspect-brk module-01-modern-javascript/demo/08-debugging
 *
 * Attach via Chrome (chrome://inspect) or your editor's debugger.
 * Set a breakpoint inside the loop, step through, and find the bug.
 */

const weights = [120, 450, 80, 3200, 60];

function averageWeight(list) {
  let total = 0;

  // BUG: <= should be <  - the last iteration reads undefined
  for (let i = 0; i <= list.length; i++) {
    total = total + list[i];
  }

  return total / list.length;
}

const avg = averageWeight(weights);

console.log('\n--- Debugging demo ---\n');
console.log('Weights:', weights);
console.log('Expected average:', (120 + 450 + 80 + 3200 + 60) / 5);
console.log('Reported average:', avg);
console.log('\nSomething is wrong - use the debugger to find the bug!\n');
