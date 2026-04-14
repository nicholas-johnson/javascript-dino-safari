// 04-edge-cases - typeof quirks, -0, Object.is, and other surprises

console.log('\n--- typeof quirks ---\n');

console.log(
  '  typeof null      =>',
  typeof null,
  '      - historic spec bug, null is NOT an object',
);
console.log('  typeof NaN       =>', typeof NaN, '   - NaN is technically a number');
console.log('  typeof []        =>', typeof [], '   - arrays report as "object"');
console.log('  typeof undefined =>', typeof undefined);
console.log('  typeof 42        =>', typeof 42);
console.log('  typeof "hello"   =>', typeof 'hello');
console.log('  typeof true      =>', typeof true);

console.log('\n  How to actually check for an array:');
console.log('  Array.isArray([])  =>', Array.isArray([]));
console.log('  Array.isArray({})  =>', Array.isArray({}));

console.log('\n--- -0 (negative zero) ---\n');

console.log(
  '  -0 === 0           =>',
  -0 === 0,
  '  - strict equality says they are the same',
);
console.log('  Object.is(-0, 0)   =>', Object.is(-0, 0), ' - Object.is disagrees');
console.log('  1 / -0             =>', 1 / -0, '  - reveals the sign');
console.log('  1 / 0              =>', 1 / 0);
console.log('  String(-0)         =>', String(-0), '    - toString hides the sign');

console.log('\n--- NaN is not equal to itself ---\n');

// eslint-disable-next-line use-isnan -- intentional classroom demo
console.log(
  '  NaN === NaN        =>',
  NaN === NaN,
  ' - the only JS value not equal to itself',
);
console.log('  Object.is(NaN, NaN)=>', Object.is(NaN, NaN), '  - Object.is handles it');
console.log('  Number.isNaN(NaN)  =>', Number.isNaN(NaN), '  - the right way to check');
// eslint-disable-next-line no-restricted-globals -- intentional classroom demo
console.log(
  '  isNaN("hello")     =>',
  isNaN('hello'),
  '  - global isNaN coerces first (dangerous)',
);
console.log(
  '  Number.isNaN("hello") =>',
  Number.isNaN('hello'),
  ' - Number.isNaN does not coerce',
);
