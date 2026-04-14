// ============================================================
// Demo 07 - Lint & Format
// Run:  node demo/07-lint-and-format
//
// This file has INTENTIONAL lint and formatting problems.
// cd into this folder, then try:
//
//   pnpm install        - install workspace dependencies
//   pnpm lint           - ESLint catches code-quality issues
//   pnpm format         - Prettier fixes formatting in place
//   pnpm start          - run the demo
// ============================================================

// --- ESLint catches these ---

// 1. Unused variable (eslint: no-unused-vars)
const unusedTracker = 'this variable is never read';

// 2. Loose equality (eslint: eqeqeq - if enabled)
const dangerLevel = '5';
if (dangerLevel == 5) {
  console.log('Loose equality says this is 5 - but it is the STRING "5"');
}

// 3. Redeclaring with var - no error, but var is hoisted and function-scoped
var zone = 'Cretaceous Valley';
var zone = 'Raptor Ridge';
console.log('Zone:', zone);

// --- Prettier catches these ---

// 4. Inconsistent quotes (Prettier normalises to single quotes per .prettierrc)
const name = 'Rex';
console.log('Hello ' + name);

// 5. Missing trailing commas
const dinos = ['Rex', 'Blue', 'Echo'];
console.log('Dinos:', dinos);

// 6. Inconsistent semicolons
const status = 'active';
console.log('Status:', status);

// 7. Long line that Prettier would wrap (printWidth is 90 in .prettierrc)
console.log(
  'This is a very long log message that goes well beyond the configured print width and should be wrapped by Prettier when you run it',
);

// --- Both tools together ---

// ESLint finds the bug, Prettier fixes the style.
// Run them together as part of your workflow:
//   pnpm lint && pnpm format

console.log(
  '\nDone! Now run `pnpm lint` and `pnpm format` from the repo root to see the tools in action.',
);
