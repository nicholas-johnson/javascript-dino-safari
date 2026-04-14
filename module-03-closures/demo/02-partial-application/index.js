/**
 * Demo: Partial application and currying - closures that remember config.
 * Run: node module-03-closures/demo/02-partial-application
 */

console.log('\n--- Partial application demo ---\n');

// --- 1. Basic partial application ---
function createAlertFn(severity) {
  return (message) => `[${severity}] ${message}`;
}

const warn = createAlertFn('WARN');
const critical = createAlertFn('CRITICAL');

console.log(warn('Fence voltage dropping'));
console.log(critical('Perimeter breach in sector 4'));
console.log(warn('Feed station low'));

// --- 2. Layered: tagged logger ---
function createTaggedLogger(tag, alertFn) {
  return (message) => `${tag}: ${alertFn(message)}`;
}

const lagoonWarn = createTaggedLogger('LAGOON', warn);
const ridgeCritical = createTaggedLogger('RIDGE', critical);

console.log('\n' + lagoonWarn('Mosasaurus near surface'));
console.log(ridgeCritical('Raptor pack moving east'));

// --- 3. Currying - transform f(a, b) into f(a)(b) ---
function curry(fn) {
  return (a) => (b) => fn(a, b);
}

const formatSighting = (zone, name) => `${name} spotted in ${zone}`;
const curriedSighting = curry(formatSighting);

const inValley = curriedSighting('Cretaceous Valley');
console.log('\n' + inValley('Rex'));
console.log(inValley('Compy'));
console.log(curriedSighting('Raptor Ridge')('Blue'));

console.log();
