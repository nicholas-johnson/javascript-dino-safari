import { BrendanEichSlide } from './BrendanEichSlide.jsx';

export const slides = [
  {
    type: 'title',
    content: {
      title: 'Module 1 - Modern JavaScript',
      subtitle: 'Base Camp: syntax, tooling, and the Node runtime',
      icon: 'rocket',
    },
  },

  {
    type: 'standard',
    content: {
      title: 'How "JavaScript" got its name',
      icon: 'book-open',
      points: [
        'Brendan Eich built "Mocha" in 10 days at Netscape (May 1995).',
        'Renamed to "LiveScript" for the Netscape Navigator 2.0 beta.',
        'Netscape struck a marketing deal with Sun Microsystems - renamed to "JavaScript" to ride the Java hype.',
        'The language has almost nothing to do with Java. The name is pure marketing.',
        'The official standard is ECMAScript (ECMA-262), maintained by TC39.',
      ],
    },
  },
  // --- Origin story ---
  {
    type: 'custom',
    component: BrendanEichSlide,
  },
  {
    type: 'standard',
    content: {
      title: "Lisp in Java's clothing",
      icon: 'code',
      points: [
        "Eich's real inspiration was Scheme (a Lisp dialect) - first-class functions, closures, dynamic typing.",
        'The Java-like syntax (braces, semicolons, `new`) was a management requirement, not a design choice.',
        'Under the hood: functions as values, prototype chains, event-loop concurrency.',
        'This makes JS uniquely suited to the web - async I/O and list processing are baked into its DNA.',
        "Every time you pass a callback or chain `.map().filter()`, you're writing Lisp with curly braces.",
      ],
    },
  },

  {
    type: 'standard',
    content: {
      title: 'Learning goals',
      icon: 'target',
      points: [
        'Understand where JavaScript came from and why it works the way it does.',
        'Use variables, numbers, booleans, arrays, objects, and control flow confidently.',
        'Manipulate strings - trim, search, slice, split, replace.',
        'Use ESM (`import` / `export`) with `"type": "module"`.',
        'Wire package scripts for run, test, and lint.',
        'Write functions with parameters and return values.',
        'Run tests with Vitest - `describe`, `it`, `expect`.',
        'Debug with `node --inspect` and your editor.',
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
        'Node runs JavaScript files directly - no browser required',
        'Demo 01: your first Node program',
      ],
    },
  },
  // --- Syntax fundamentals (broken into topic slides) ---
  {
    type: 'code',
    content: {
      title: 'Variables - const and let',
      code: `const zone = 'Cretaceous Valley';   // cannot reassign
const MAX_DINOS = 50;               // convention: UPPER_SNAKE for constants

let headcount = 0;                  // can reassign
headcount = 12;

// var is legacy - avoid it
// var old = 'hoisted and function-scoped';`,
      highlights: [
        '`const` by default - switch to `let` only when you need to reassign',
        '`var` is function-scoped and hoisted - prefer block-scoped `const`/`let`',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Numbers',
      code: `const weight = 8000;          // integer
const height = 5.2;           // floating point (all numbers are 64-bit IEEE 754)

Math.round(5.7);              // 6
Math.floor(5.7);              // 5
Math.ceil(5.2);               // 6
Math.max(10, 20, 3);          // 20

parseInt('42kg', 10);         // 42
parseFloat('3.14m');          // 3.14

0.1 + 0.2 === 0.3;           // false! (floating-point trap)`,
      highlights: [
        'JavaScript has one number type - no separate int/float',
        'Floating-point arithmetic has quirks - we cover this in the Gotchas module',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Booleans and equality',
      code: `const isAlive = true;
const isFriendly = false;

// Strict equality - always use this
42 === '42';    // false (different types)
42 !== '42';    // true

// Loose equality - avoid
42 == '42';     // true  (coerces!)

// Logical operators
isAlive && isFriendly;    // false
isAlive || isFriendly;    // true
!isFriendly;              // true`,
      highlights: [
        'Always use `===` and `!==` - loose `==` coerces types in surprising ways',
        'Logical operators: `&&` (and), `||` (or), `!` (not)',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Arrays and objects',
      code: `// Arrays - ordered lists
const dinos = ['Rex', 'Blue', 'Echo'];
dinos.length;               // 3
dinos[0];                   // 'Rex'
dinos.push('Delta');        // adds to end

// Objects - key-value pairs
const rex = {
  name: 'Rex',
  zone: 'Cretaceous Valley',
  dangerLevel: 5,
};
rex.name;                   // 'Rex'
rex['zone'];                // 'Cretaceous Valley'`,
      highlights: [
        'Arrays and objects are the two core data structures',
        'We cover methods like `.map()`, `.filter()`, `.reduce()` in Module 2',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Control flow',
      code: `// if / else
if (dangerLevel >= 4) {
  console.log('EVACUATE');
} else if (dangerLevel >= 2) {
  console.log('Caution');
} else {
  console.log('All clear');
}

// for...of - iterate arrays
const dinos = ['Rex', 'Blue', 'Echo'];
for (const name of dinos) {
  console.log(name);
}

// ternary - inline condition
const status = dangerLevel > 3 ? 'DANGER' : 'safe';`,
      highlights: [
        '`for...of` for arrays; `for...in` for object keys (less common)',
        'Ternary operator is handy for short conditional expressions',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'String manipulation',
      code: `const csv = 'Rex,Raptor,Bronto,Stego';
const names = csv.split(',');    // ['Rex', 'Raptor', ...]
names.join(' | ');               // 'Rex | Raptor | ...'

'  hello  '.trim().toUpperCase();  // 'HELLO'
'Rex spotted'.includes('Rex');     // true
'Rex spotted'.slice(0, 3);        // 'Rex'`,
      highlights: [
        'Strings are immutable - every method returns a new string',
        'Demo 03: template literals, trim, search, slice, split, replace',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Functions',
      code: `function greetRanger(name) {
  return 'Welcome, Ranger ' + name + '.';
}
console.log(greetRanger('Ellie'));

function add(a, b) {
  return a + b;
}
const result = add(2, 3);  // 5`,
      highlights: [
        '`function` keyword, parameters in parens, `return` sends a value back',
        'Forget `return` and you get `undefined` - a classic beginner trap',
      ],
    },
  },

  {
    type: 'code',
    content: {
      title: 'Arrow functions',
      code: `// concise body - implicit return
const double = (n) => n * 2;
const shout  = (msg) => msg.toUpperCase() + '!';

// block body - explicit return
const buildAlert = (zone, level) => {
  const tag = level >= 4 ? 'DANGER' : 'OK';
  return \`[\${tag}] Zone: \${zone}\`;
};`,
      highlights: [
        'Single expression → implicit return; braces → you must write `return`',
        'Arrows shine as callbacks - `.map(n => n * 2)` - covered in Module 2',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'ESM in Node',
      code: `
export const PARK = 'Dinosaur Safari';
export default function briefing() {
  console.log(\`Welcome to \${PARK}\`);
}
  
// Elsewhere...

import briefing, { PARK } from './briefing.js';

briefing();
console.log(\`Welcome to \${PARK}\`);
`,
      highlights: [
        '"type": "module" unlocks import/export in .js files',
        'Default export = one “main” thing; named = many',
      ],
    },
  },

  {
    type: 'comparison',
    content: {
      title: 'ESM vs CommonJS',
      left: {
        label: 'ESM (what we use)',
        items: [
          '`import` / `export` - static structure',
          'Native in modern Node',
          'Matches browser tooling',
        ],
      },
      right: {
        label: 'CJS (legacy)',
        items: [
          '`require` / `module.exports`',
          'Still in older codebases',
          'Prefer ESM for new projects',
        ],
      },
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Package scripts',
      icon: 'keyboard',
      points: [
        '`pnpm dev`, `pnpm test`, `pnpm lint` - repeatable commands.',
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
    type: 'code',
    content: {
      title: 'Testing with Vitest',
      code: `import { describe, it, expect } from 'vitest';
import { formatAlert } from './alert.js';

describe('formatAlert', () => {
  it('formats a dino sighting', () => {
    const dino = { name: 'Rex', zone: 'Valley', dangerLevel: 5 };
    expect(formatAlert(dino)).toBe('[ALERT] Rex in Valley (level 5)');
  });
});`,
      highlights: [
        '`describe` groups tests, `it` describes one behaviour, `expect` checks the result',
        'Demo 07: open alert.js and alert.test.js side by side',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Lint & format',
      icon: 'check-square',
      points: [
        'ESLint catches suspicious patterns - unused vars, loose `==`, redeclared `var`.',
        'Prettier fixes formatting - quotes, commas, line width, semicolons.',
        '`pnpm lint` and `pnpm format` from any exercise or the repo root.',
        'Demo 09 has intentional violations - try running both tools on it.',
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
        'Demo 08 has an intentional bug - practice stepping through loops.',
      ],
    },
  },
  {
    type: 'title',
    content: {
      title: 'Rangers dismissed - Module 1',
      subtitle: 'Open demos, run tests, then head to the exercises folder',
      icon: 'party-popper',
    },
  },
];
