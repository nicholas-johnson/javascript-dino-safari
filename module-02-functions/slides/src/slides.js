export const slides = [
  {
    type: 'title',
    content: {
      title: 'Module 2 - Functions & Functional Loops',
      subtitle: 'Functions, Vitest, arrows, filter, sort, map, reduce',
      icon: 'zap',
    },
  },
  {
    type: 'code',
    content: {
      title: 'Your first function',
      code: `function add(a, b) {
  return a + b;
}
console.log(add(2, 3));  // 5

function greet(name) {
  return 'Hello, ' + name + '!';
}`,
      highlights: [
        'The `function` keyword, parameters in parens, `return` to send a value back',
        'Demo 01: the building block for everything that follows',
      ],
    },
  },
  {
    type: 'welcome',
    content: {
      title: 'Functions are the building block',
      points: [
        'Three ways to declare: declaration, expression, arrow.',
        'Default and rest parameters for flexible signatures.',
        'Functions as values - pass them, store them, return them.',
      ],
    },
  },
  {
    type: 'comparison',
    content: {
      title: 'Declaration vs expression vs arrow',
      left: {
        label: 'Declaration',
        code: `function greet(name) {
  return \`Hello, \${name}\`;
}`,
      },
      right: {
        label: 'Arrow',
        code: `const greet = (name) =>
  \`Hello, \${name}\`;`,
      },
    },
  },
  {
    type: 'code',
    content: {
      title: 'Defaults and rest',
      code: `function log(zone = 'Uncharted', ...ids) {
  for (const id of ids) {
    console.log(\`[\${zone}] \${id}\`);
  }
}
log('Ridge', 'TRX-001', 'STG-014');`,
      highlights: [
        'Defaults fill in for undefined - keep call sites clean',
        '...rest collects remaining args into a real array',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: '.filter() - keep what passes',
      code: `const dangerous = dinosaurs.filter(d => d.dangerLevel > 5);
const evens = [1, 2, 3, 4].filter(n => n % 2 === 0);
const shared = a.filter(id => b.includes(id));`,
      highlights: [
        'Returns a new array - original untouched',
        'Predicate callback: return true to keep, false to drop',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: '.sort() - order with a comparator',
      code: `[10, 1, 21, 2].sort((a, b) => a - b);  // [1, 2, 10, 21]
dinos.sort((a, b) => b.dangerLevel - a.dangerLevel);
dinos.sort((a, b) => a.species.localeCompare(b.species));`,
      highlights: [
        'Without a comparator, sort is lexicographic - [1, 10, 2] !',
        '.sort() mutates - spread first if you need a copy',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: '.map() - transform each element',
      code: `const doubled = [1, 2, 3].map(n => n * 2);
const names = dinos.map(d => d.species);
const lines = dinos.map(d =>
  \`\${d.species} (\${d.zone}) - danger: \${d.dangerLevel}\`
);`,
      highlights: [
        'Same length in, same length out - every element transformed',
        'Use to reshape objects, extract fields, format strings',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: '.reduce() - fold into one value',
      code: `const total = nums.reduce((acc, n) => acc + n, 0);
const byZone = dinos.reduce((acc, d) => {
  acc[d.zone] = (acc[d.zone] ?? 0) + 1;
  return acc;
}, {});`,
      highlights: [
        'Accumulator carries state between iterations',
        'Always pass an initial value - empty arrays throw without one',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Pipeline - compose them all',
      code: `const report = dinosaurs
  .filter(d => d.diet === 'carnivore')
  .map(d => ({ zone: d.zone, danger: d.dangerLevel }))
  .reduce((acc, row) => {
    acc[row.zone] = (acc[row.zone] ?? 0) + row.danger;
    return acc;
  }, {});`,
      highlights: [
        'Read top to bottom: filter, reshape, fold',
        'Each step returns a new value - no mutation',
      ],
    },
  },
  {
    type: 'rules',
    content: {
      title: 'Field rules - Module 2',
      rules: [
        {
          rule: 'Prefer arrows for callbacks',
          example: 'Short, no own `this` - perfect for array methods.',
          icon: 'zap',
        },
        {
          rule: 'Always pass an initial value to reduce',
          example: 'Empty arrays throw without one.',
          icon: 'shield',
        },
        {
          rule: 'Name your pipeline stages',
          example: 'Small functions > 40-line chains.',
          icon: 'file-code',
        },
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Vitest',
      icon: 'flask',
      points: [
        'Unit tests run in Node; watch mode while you refactor.',
        '`pnpm vitest run path/to/file.test.js` for a single exercise.',
        'Demo 02: `describe`, `it`, `expect`.',
      ],
    },
  },
];
