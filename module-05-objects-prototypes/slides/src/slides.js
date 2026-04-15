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
    type: 'standard',
    content: {
      title: 'Learning objectives',
      icon: 'target',
      points: [
        'Build object literals with methods and use `this` correctly.',
        'Trace the prototype chain and predict property lookup.',
        "Use `class` syntax - `extends`, `super`, getters, statics, private fields - knowing it's sugar over prototypes.",
        'Choose `Map` / `Set` when object keys or uniqueness semantics matter.',
        'Prefer composition for mixed capabilities vs deep inheritance trees.',
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
      title: 'Prototypes with object literals',
      code: `const dino = {
  roar() { return \`\${this.name} ROARS\`; },
  describe() { return \`\${this.name} (danger: \${this.danger})\`; },
};

const rex = { name: 'Rex', danger: 5, __proto__: dino };
rex.__proto__ = dino;

rex.roar();       // "Rex ROARS"

Object.getPrototypeOf(rex) === dino;  // true`,
      highlights: [
        '`__proto__` in a literal sets the prototype - methods are shared, not copied',
        'Use `Object.getPrototypeOf()` to inspect; `__proto__` is legacy but visible in debuggers',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: '`this` in object literals',
      code: `const feeder = {
  name: 'Canyon Feeder',
  supply: 50,
  status() {
    return \`\${this.name}: \${this.supply}kg\`;
  },
};
feeder.status();  // "Canyon Feeder: 50kg"

// this = the object before the dot
const ref = feeder.status;
ref();  // TypeError - no object, no this`,
      highlights: [
        "`this` is set at call time - it's the object to the left of the dot",
        'Extract a method and `this` is lost - use `.bind()` or keep calling via the object',
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
      title: 'Classes, SOLID, and clean code',
      icon: 'shield',
      points: [
        'S - Single Responsibility: one class = one reason to change. `Dino` tracks data, `DinoRenderer` draws it.',
        'O - Open/Closed: extend via subclass or composition, not by editing the base class.',
        'L - Liskov Substitution: a `Flyer` must work anywhere a `Dino` is expected.',
        "I - Interface Segregation: keep classes small - don't force swim() on things that fly.",
        "D - Dependency Inversion: pass collaborators in (constructor injection), don't hardcode them.",
        'In JS, composition often beats deep inheritance - SOLID still applies, the mechanism changes.',
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
      title: 'Inheritance vs composition',
      left: {
        label: 'Inheritance stacks',
        items: ['Tall trees of subclasses', 'Hard to change behavior mixes later'],
      },
      right: {
        label: 'Composition (modern default)',
        items: [
          'Mix capabilities with functions / objects',
          'Avoids fragile deep hierarchies that break when requirements change',
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
        'Demo 06: destructured factory options - `createRanger({ name, zone })`',
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
