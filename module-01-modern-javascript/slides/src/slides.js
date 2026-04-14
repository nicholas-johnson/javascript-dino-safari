export const slides = [
  {
    type: 'title',
    content: {
      title: 'Module 1 — Modern JavaScript',
      subtitle: 'Base Camp: syntax, tooling, and the Node runtime',
      icon: 'rocket',
    },
  },
  {
    type: 'welcome',
    content: {
      title: 'Perimeter sensors are live',
      points: [
        'Cretaceous Valley is streaming IDs faster than HQ can parse.',
        'Before we track a single theropod, we need a modern JS workflow.',
        'Everything runs in Node — ESM, scripts, tests, lint, debug.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Hello World in Node',
      code: `// hello.js
console.log('Hello, Jurassic World!');

// run it
// $ node hello.js`,
      highlights: [
        'Node runs JavaScript files directly — no browser required',
        'Demo 01: your first Node program',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Syntax fundamentals — quick refresh',
      code: `const zone = 'Cretaceous Valley';
let headcount = 0;

const dinos = ['Rex', 'Blue', 'Echo'];
for (const name of dinos) {
  headcount++;
  console.log(\`\${name} — #\${headcount} in \${zone}\`);
}`,
      highlights: [
        '`const` for values that never reassign; `let` when they must',
        'Template literals, `for...of`, and block scoping — the everyday basics',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Learning goals',
      icon: 'target',
      points: [
        'Manipulate strings — trim, search, slice, split, replace.',
        'Use ESM (`import` / `export`) with `"type": "module"`.',
        'Wire package scripts for run, test, and lint.',
        'Debug with `node --inspect` and your editor.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'String manipulation — everyday toolkit',
      code: `const csv = 'Rex,Raptor,Bronto,Stego';
const names = csv.split(',');    // ['Rex', 'Raptor', ...]
names.join(' | ');               // 'Rex | Raptor | ...'

'  hello  '.trim().toUpperCase();  // 'HELLO'
'Rex spotted'.includes('Rex');     // true
'Rex spotted'.slice(0, 3);        // 'Rex'`,
      highlights: [
        'Strings are immutable — every method returns a new string',
        'Demo 03: template literals, trim, search, slice, split, replace',
      ],
    },
  },
  {
    type: 'comparison',
    content: {
      title: 'ESM vs the old CommonJS herd',
      left: {
        label: 'ESM (what we use)',
        items: [
          '`import` / `export` — static structure',
          'Native in modern Node',
          'Matches browser tooling',
        ],
      },
      right: {
        label: 'CJS (legacy paddock)',
        items: [
          '`require` / `module.exports`',
          'Still in older codebases',
          'Prefer ESM for new park systems',
        ],
      },
    },
  },
  {
    type: 'code',
    content: {
      title: 'ESM in Node',
      code: `// package.json
{ "type": "module" }

// named + default exports
export const PARK = 'Dinosaur Safari';
export default function briefing() {
  console.log(\`Welcome to \${PARK}\`);
}`,
      highlights: [
        '"type": "module" unlocks import/export in .js files',
        'Default export = one “main” thing; named = many',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Package scripts = ranger shortcuts',
      icon: 'keyboard',
      points: [
        '`pnpm dev`, `pnpm test`, `pnpm lint` — repeatable commands.',
        'Scripts are strings: chain with `&&`, pass args after `--`.',
        'Keep “how we run this repo” in package.json, not tribal memory.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Example scripts',
      code: `{
  "scripts": {
    "test": "vitest run",
    "lint": "eslint .",
    "demo:esm": "node demo/04-esm-basics"
  }
}`,
      highlights: [
        'One source of truth for onboarding and CI',
        'Students: complete the package-scripts exercise in this module',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Lint & format — keep the codebase stampede-free',
      icon: 'check-square',
      points: [
        'ESLint catches suspicious patterns and style drift.',
        'Prettier ends bike-shedding on spacing and quotes.',
        'Run from root; same rules for every module in the monorepo.',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Debugging workflow',
      icon: 'search',
      points: [
        '`node --inspect path/to/script.js` then attach Chrome or your IDE.',
        'Breakpoints > `console.log` when state is complex.',
        'Demo 06 has an intentional bug — practice stepping through loops.',
      ],
    },
  },
  {
    type: 'rules',
    content: {
      title: 'Field rules — Module 1',
      rules: [
        {
          rule: 'Prefer === and explicit coercion',
          example: 'Sensors send strings; parse on purpose.',
          icon: 'scale',
        },
        {
          rule: 'Keep side effects at the edges',
          example: 'Pure helpers are easier to test in Vitest.',
          icon: 'target',
        },
        {
          rule: 'One command to reproduce',
          example: 'If it is not in a script, it will get lost.',
          icon: 'clipboard-list',
        },
      ],
    },
  },
  {
    type: 'welcome',
    content: {
      title: 'Exercises — Base Camp missions',
      points: [
        '01 — Strings: shout, whisper, format, search, initials',
        '02 — Package scripts for the mini tracker',
        '03 — ESM imports: Node built-in, npm, local module',
      ],
    },
  },
  {
    type: 'title',
    content: {
      title: 'Rangers dismissed — Module 1',
      subtitle: 'Open demos, run tests, then head to the exercises folder',
      icon: 'party-popper',
    },
  },
];
