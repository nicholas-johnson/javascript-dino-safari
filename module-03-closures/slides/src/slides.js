export const slides = [
  {
    type: 'title',
    content: {
      title: 'Module 3 - Closures & Currying',
      subtitle: 'Private state, partial application, and immutable data',
      icon: 'lock',
    },
  },
  {
    type: 'welcome',
    content: {
      title: 'Functions that remember',
      points: [
        'A closure captures variables from its creation scope.',
        'Use closures for private state, factories, and pre-configured functions.',
        'Immutability protects shared data from action-at-a-distance bugs.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Closure',
      code: `function createZoneTracker(zoneName) {
  const sightings = [];
  const log = (id, note) => sightings.push({ id, note });
  const snapshot = () => [...sightings];
  
  return { log, snapshot };
}
  
const { log, snapshot } = createZoneTracker('A');`,
      highlights: [
        '`sightings` is private - callers cannot mutate it directly',
        'Each call creates a fresh scope with its own array',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Partial application',
      code: `function createAlertFn(severity) {
  return (message) =>
    \`[\${severity}] \${message}\`;
}

const warn  = createAlertFn('WARN');
const crit  = createAlertFn('CRITICAL');

warn('Fence voltage low');       // "[WARN] Fence voltage low"
crit('T-Rex in visitor area');   // "[CRITICAL] T-Rex in visitor area"`,
      highlights: [
        'The outer function "bakes in" the severity - callers only supply the message',
        'Each returned function is a lightweight, pre-configured tool',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Partial application - composing layers',
      code: `function createTaggedLogger(tag, alertFn) {
  return (message) =>
    console.log(alertFn(\`[\${tag}] \${message}\`));
}

const crit = createAlertFn('CRITICAL');
const lagoonLog = createTaggedLogger('LAGOON', crit);

lagoonLog('Mosasaurus breached');
// logs: "[CRITICAL] [LAGOON] Mosasaurus breached"`,
      highlights: [
        'Stack partial-application layers to build specific loggers from generic parts',
        'No classes, no inheritance - just functions returning functions',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Currying - one arg at a time',
      code: `const curry = (fn) => (a) => (b) => fn(a, b);

const sighting = curry((zone, name) =>
  \`\${name} spotted in \${zone}\`
);

const inValley = sighting('Cretaceous Valley');
inValley('Rex');    // "Rex spotted in Cretaceous Valley"
inValley('Blue');   // "Blue spotted in Cretaceous Valley"

// or call both args at once
sighting('Ridge')('Stego');  // "Stego spotted in Ridge"`,
      highlights: [
        'Currying transforms f(a, b) into f(a)(b) - each call returns a new function',
        'Use when the first argument is stable across many calls',
      ],
    },
  },
  {
    type: 'comparison',
    content: {
      title: 'Partial application vs currying',
      left: {
        label: 'Partial application',
        items: [
          'Fix some args, return a function for the rest',
          'Can fix any number of args at once',
          'createAlertFn("WARN") fixes 1 of 1',
        ],
      },
      right: {
        label: 'Currying',
        items: [
          'Transform f(a, b) into f(a)(b)',
          'Always one arg per call in the chain',
          'Useful for pipelines and composition',
        ],
      },
    },
  },
  {
    type: 'code',
    content: {
      title: 'The mutation trap',
      code: `const rex = { name: 'Rex', zone: 'Valley', dangerLevel: 4 };

// Looks harmless - but it mutates the original
const updated = rex;
updated.dangerLevel = 5;

console.log(rex.dangerLevel);  // 5 - oops!
// Both variables point to the SAME object in memory`,
      highlights: [
        'Objects are passed by reference - assignment copies the pointer, not the data',
        'This is the #1 source of "spooky action-at-a-distance" bugs',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Immutable updates with spread',
      code: `const rex = { name: 'Rex', zone: 'Valley', dangerLevel: 4 };

// Spread creates a shallow copy, then override one field
const promoted = { ...rex, dangerLevel: 5 };

console.log(rex.dangerLevel);      // 4 - untouched
console.log(promoted.dangerLevel); // 5 - new object

// Works for arrays too
const dinos = ['Rex', 'Blue'];
const more  = [...dinos, 'Echo'];  // new array`,
      highlights: [
        'Spread (`...`) copies all properties into a new object',
        'Properties listed after the spread override the copied values',
      ],
    },
  },
  {
    type: 'comparison',
    content: {
      title: 'Spread vs structuredClone',
      left: {
        label: 'Spread',
        items: [
          'Fast for flat records',
          'Shallow - nested objects still shared',
          '`{ ...obj, field: newValue }`',
        ],
      },
      right: {
        label: 'structuredClone',
        items: [
          'Deep clone - nested objects fully copied',
          'Slower, but safe for complex data',
          '`structuredClone(obj)`',
        ],
      },
    },
  },
  {
    type: 'rules',
    content: {
      title: 'Field rules - Module 3',
      rules: [
        {
          rule: 'Prefer factories for private state',
          example: 'Closures beat global variables every time.',
          icon: 'lock',
        },
        {
          rule: 'Copy before you change',
          example: 'Especially shared dino records from HQ.',
          icon: 'clipboard',
        },
        {
          rule: 'Curry measured, not dogmatic',
          example: 'If both args are always known, just pass them.',
          icon: 'target',
        },
      ],
    },
  },
  {
    type: 'welcome',
    content: {
      title: 'Exercises',
      points: [
        '01 - Zone tracker factory (closures)',
        '02 - Partial application for alert loggers',
        '03 - Immutable record updates',
      ],
    },
  },
  {
    type: 'title',
    content: {
      title: 'Scope locked - Module 3',
      subtitle: 'Run demos, then exercises under module-03-closures',
      icon: 'check-circle',
    },
  },
];
