export const slides = [
  {
    type: 'title',
    content: {
      title: 'Module 2 - Functions & Functional Loops',
      subtitle: 'Array methods replace most hand-written loops',
      icon: 'zap',
    },
  },

  {
    type: 'standard',
    content: {
      title: 'Functional loops',
      icon: 'layers',
      points: [
        'A **functional loop** is still a loop - the engine walks the array - but you describe *what* should happen, not index bookkeeping.',
        '**`.filter` / `.map` / `.reduce`** return new values (except `.sort()`, which mutates in place). You pass a small callback; the method handles iteration.',
        'That vocabulary - keep, transform, fold, order - reads like a sentence and composes into **pipelines**: filter, then map, then reduce.',
        'Module 1 covered `function` syntax and Vitest. Here we use **arrow callbacks** everywhere they stay short and clear.',
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
        '**Demo 01:** `node module-02-functions/demo/01-filter` (or `pnpm demo:filter` from `module-02-functions`)',
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
        '**Demo 02:** `node module-02-functions/demo/02-sort` (or `pnpm demo:sort` from `module-02-functions`)',
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
        '**Demo 03:** `node module-02-functions/demo/03-map` (or `pnpm demo:map` from `module-02-functions`)',
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
        '**Demo 04:** `node module-02-functions/demo/04-reduce` (or `pnpm demo:reduce` from `module-02-functions`)',
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
        '**Demo 05:** `node module-02-functions/demo/05-pipelines` (or `pnpm demo:pipelines` from `module-02-functions`)',
      ],
    },
  },
];
