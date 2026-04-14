export const slides = [
  {
    type: 'title',
    content: {
      title: 'Module 4 - JS Gotchas',
      subtitle: 'The weird parts that bite production code',
      icon: 'alert-triangle',
    },
  },
  {
    type: 'welcome',
    content: {
      title: 'JavaScript has opinions about your data',
      points: [
        'Values silently coerce when you mix types.',
        'Equality comes in three flavours: `==`, `===`, `Object.is`.',
        'Numbers are IEEE floats - and that matters for money.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Coercion traps',
      code: `"5" + 3     // "53" (string concat)
"5" - 3     // 2   (numeric)
[] == false // true (!)
Boolean([]) // true`,
      highlights: ['The same value can behave differently depending on the operator'],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'The eight falsy values',
      icon: 'x-circle',
      points: [
        '`false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`',
        'Everything else is truthy - including `[]`, `{}`, and `"0"`.',
        '`if ([])` is truthy, but `[] == false` is true. Welcome to JS.',
      ],
    },
  },
  {
    type: 'comparison',
    content: {
      title: '`||` vs `??`',
      left: {
        label: '|| (logical OR)',
        items: [
          'Returns first truthy operand',
          '`0 || 42` → `42` - oops, `0` was valid!',
          '`"" || "default"` → `"default"`',
        ],
      },
      right: {
        label: '?? (nullish coalescing)',
        items: [
          'Returns first non-null/undefined operand',
          '`0 ?? 42` → `0` - keeps valid zeros',
          '`"" ?? "default"` → `""`',
        ],
      },
    },
  },
  {
    type: 'comparison',
    content: {
      title: '`==` vs `===`',
      left: {
        label: '== (loose)',
        items: [
          'Allows coercion - `null == undefined` is true',
          'Use deliberately: `val == null` catches both',
        ],
      },
      right: {
        label: '=== (strict)',
        items: [
          'No coercion - compare type + value',
          'Your default for almost all comparisons',
        ],
      },
    },
  },
  {
    type: 'standard',
    content: {
      title: '`Object.is` - the third option',
      icon: 'scale',
      points: [
        '`Object.is(NaN, NaN)` → `true` (unlike `===`)',
        '`Object.is(0, -0)` → `false` (unlike `===`)',
        'Use when you need mathematically precise identity.',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: '`typeof` quirks',
      icon: 'help-circle',
      points: [
        '`typeof null === "object"` - historic spec bug',
        '`typeof NaN === "number"` - a number that is not a number',
        '`typeof [] === "object"` - use `Array.isArray()` instead',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Numbers that bite',
      icon: 'calculator',
      points: [
        '`0.1 + 0.2 !== 0.3` - IEEE 754 floats',
        '`NaN !== NaN` - use `Number.isNaN()`',
        '`parseInt("12abc")` → `12` - it stops at the first non-digit',
        'Global `isNaN("hello")` → `true` - it coerces first',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Money: work in cents',
      code: `function dollarsToCents(n) {
  return Math.round(n * 100);
}
// Sum CENTS, not dollars - then format at the edge.`,
      highlights: [
        'Never accumulate float dollars - convert each item to integer cents first',
      ],
    },
  },
  {
    type: 'rules',
    content: {
      title: 'Field rules - Module 4',
      rules: [
        {
          rule: 'Use ?? for defaults, not ||',
          example: '`timeout ?? 5000` keeps a valid `0`.',
          icon: 'zap',
        },
        {
          rule: 'Validate at the boundary',
          example: 'Sensors → `Number.isFinite()` or null - be explicit.',
          icon: 'search',
        },
        {
          rule: 'Never float currency',
          example: 'Cents are integers; display is formatting.',
          icon: 'hash',
        },
        {
          rule: 'Pick the right equality tool',
          example: 'Default `===`; `== null` for nullish; `Object.is` for edge cases.',
          icon: 'check-circle',
        },
      ],
    },
  },
  {
    type: 'welcome',
    content: {
      title: 'Exercises - Bug Hunt',
      points: [
        '01 - Coercion & truthiness: fix 6 broken utility functions',
        '02 - Equality & typeof: fix 5 broken utility functions',
        '03 - Numbers & money: fix 5 broken utility functions',
      ],
    },
  },
  {
    type: 'title',
    content: {
      title: 'Gotchas defused - Module 4',
      subtitle: 'Trust nothing from the wire until you parse it',
      icon: 'check-circle',
    },
  },
];
