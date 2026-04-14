export const slides = [
  {
    type: 'title',
    content: {
      title: 'Module 5 - Objects & Prototypes',
      subtitle: 'The real registry under the hood: prototypes, maps, composition',
      icon: 'tree',
    },
  },
  {
    type: 'welcome',
    content: {
      title: 'The Dinosaur Registry does not run on vibes',
      points: [
        'Property lookup walks the prototype chain.',
        '`class` is mostly syntax sugar over prototypes.',
        'Pick Map/Set when keys or uniqueness semantics need more than plain objects.',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Prototype chain mental model',
      icon: 'git-branch',
      points: [
        'Every object has a hidden link to its prototype (`Object.getPrototypeOf`).',
        'Missing property? JS walks up the chain until it finds it or hits `null`.',
        '`instanceof` checks the prototype chain, not the constructor name text.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Constructor + prototype methods',
      code: `function Dino(name) { this.name = name; }
Dino.prototype.roar = function () {
  return \`\${this.name} ROARS\`;
};
const rex = new Dino('Rex');
rex.roar();`,
      highlights: ['Shared behavior on prototype - one function, many instances'],
    },
  },
  {
    type: 'code',
    content: {
      title: '`class` - sugar over prototypes',
      code: `class Dino {
  constructor(name) { this.name = name; }
  roar() { return \`\${this.name} ROARS\`; }
}
class Flyer extends Dino {
  constructor(name, ws) { super(name); this.ws = ws; }
  fly() { return \`\${this.name} - \${this.ws}m\`; }
}
typeof Dino; // "function" - still a function`,
      highlights: [
        'Same prototype chain, cleaner syntax - extends, super, getters, statics',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: '`Object.create` and linking prototypes',
      icon: 'link',
      points: [
        '`Object.create(proto)` sets the prototype explicitly.',
        'Subclassing (pre-class) wired `Child.prototype = Object.create(Parent.prototype)`.',
        'Know this even if you mostly write `class` today.',
      ],
    },
  },
  {
    type: 'comparison',
    content: {
      title: 'Plain object vs Map',
      left: {
        label: 'Object {}',
        items: [
          'Keys are strings/symbols only',
          'Prototype baggage; key collision with defaults',
          'Great for JSON-shaped records',
        ],
      },
      right: {
        label: 'Map',
        items: [
          'Any key type (objects, IDs)',
          'Size, iteration order, no prototype key noise',
          'Great for registries keyed by trackingId',
        ],
      },
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Set for uniqueness',
      icon: 'hash',
      points: [
        'Track unique species tags or visited zones.',
        'Combine with Map: Map for id→record, Set for “have we seen this species?”',
      ],
    },
  },
  {
    type: 'comparison',
    content: {
      title: 'Inheritance vs composition',
      left: {
        label: 'Inheritance stacks',
        items: ['Tall trees of subclasses', 'Hard to change behavior mixes later'],
      },
      right: {
        label: 'Composition (modern default)',
        items: [
          'Mix capabilities with functions / objects',
          'Fewer “diamond” surprises in big parks',
        ],
      },
    },
  },
  {
    type: 'code',
    content: {
      title: 'Composition sketch',
      code: `const withSwim = (d) => ({
  ...d,
  swim: () => \`\${d.name} cuts through water\`,
});
const splash = withSwim({ name: 'Splash' });`,
      highlights: [
        'Spread copies shallow fields - watch nested vitals',
        'Demo 05: destructured factory options - `createRanger({ name, zone })`',
      ],
    },
  },
  {
    type: 'rules',
    content: {
      title: 'Field rules - Module 5',
      rules: [
        {
          rule: 'Reach for Map/Set when objects lie',
          example: 'Dynamic keys, frequent add/remove, non-string keys.',
          icon: 'map',
        },
        {
          rule: 'Prefer composition for “capabilities”',
          example: 'Fly + swim + armored should not explode the class tree.',
          icon: 'puzzle',
        },
        {
          rule: 'Understand prototypes to debug `this` + instanceof',
          example: 'Libraries still expose constructor patterns.',
          icon: 'eye',
        },
      ],
    },
  },
  {
    type: 'modules',
    content: {
      title: 'Module 5 exercise themes',
      modules: [
        { num: '1', name: 'Prototype Safari - no class', icon: 'triangle' },
        { num: '2', name: 'Registry with Map', icon: 'clipboard-list' },
        { num: '3', name: 'Compose a dino', icon: 'sparkles' },
      ],
    },
  },
  {
    type: 'title',
    content: {
      title: 'Registry locked - Module 5',
      subtitle: 'Demos in module-05 then hit the exercises folder',
      icon: 'award',
    },
  },
];
