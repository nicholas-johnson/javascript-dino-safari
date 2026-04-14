/**
 * Demo: Introduction to functions — the function keyword, parameters, returns.
 * Run: node module-02-functions/demo/01-function-intro
 */

console.log('\n--- Introduction to functions ---\n');

// --- 1. A basic function ---
function greet() {
  return 'Hello, Jurassic World!';
}

console.log(greet());

// --- 2. Parameters ---
function greetRanger(name) {
  return 'Welcome, Ranger ' + name + '.';
}

console.log(greetRanger('Ellie'));
console.log(greetRanger('Alan'));

// --- 3. Multiple parameters ---
function add(a, b) {
  return a + b;
}

console.log('2 + 3 =', add(2, 3));
console.log('10 + 20 =', add(10, 20));

// --- 4. Using the return value ---
function double(n) {
  return n * 2;
}

const result = double(7);
console.log('double(7) =', result);
console.log('double(double(3)) =', double(double(3)));

// --- 5. Functions that do more work ---
function describeDino(name, species, zone) {
  return name + ' the ' + species + ', currently in ' + zone;
}

console.log(describeDino('Rex', 'Tyrannosaurus', 'Cretaceous Valley'));
console.log(describeDino('Blue', 'Velociraptor', 'Raptor Paddock'));

// --- 6. Returning different types ---
function isPositive(n) {
  return n > 0;
}

console.log('\nisPositive(5):', isPositive(5));
console.log('isPositive(-3):', isPositive(-3));
console.log('isPositive(0):', isPositive(0));

console.log();
