/**
 * Demo: package.json scripts and npm packages.
 * Run: node module-01-modern-javascript/demo/05-package-scripts
 *
 * Instructor walk-through:
 *   1. `pnpm init` in a scratch folder to scaffold a package.json
 *   2. `pnpm add picocolors` to install a package from npm
 *   3. Add a "start" script that runs this file with `node`
 *   4. `pnpm start` to run it (start and test don't need `run`)
 *   5. Pass arguments: pnpm start -- --sector=ridge --verbose
 *   6. Show how scripts get node_modules/.bin on PATH (eslint, vitest)
 */

import pc from 'picocolors';

const args = process.argv.slice(2);

const sector = args.find((a) => a.startsWith('--sector='))?.split('=')[1] ?? 'all';

console.log('\n--- Package scripts demo ---\n');
console.log(pc.bold(pc.green('DINO_SAFARI_TRACKER_ONLINE')));
console.log(`Monitoring sector: ${pc.cyan(sector)}`);
console.log(`Node version:      ${process.version}`);
console.log(`Working directory:  ${process.cwd()}`);

const scriptName = process.env.npm_lifecycle_event;
if (scriptName) {
  console.log(`Package script:    ${pc.yellow(`"${scriptName}"`)}`);
} else {
  console.log(`Package script:    ${pc.dim('(none - ran directly with node)')}`);
}

if (args.includes('--verbose')) {
  console.log('\nFull argv:', process.argv);
}

console.log(`\n${pc.dim('Try: pnpm demo:scripts -- --sector=ridge --verbose')}\n`);
