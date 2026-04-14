// 02-truthy-falsy - the complete falsy roster and the traps around it

console.log('\n--- The eight falsy values ---\n');

const falsyValues = [false, 0, -0, 0n, '', null, undefined, NaN];

for (const val of falsyValues) {
  console.log(`  ${String(val).padEnd(12)} => Boolean(${String(val)}) = ${Boolean(val)}`);
}

console.log('\n--- Truthy surprises ---\n');

console.log('  Boolean([])        =>', Boolean([]));
console.log('  Boolean({})        =>', Boolean({}));
console.log('  Boolean("0")       =>', Boolean('0'));
console.log('  Boolean("false")   =>', Boolean('false'));
console.log(
  '  [] == false        =>',
  [] == false,
  '  (coercion: [] → "" → 0, false → 0)',
);

console.log('\n--- The !! double-bang idiom ---\n');

const reading = 0;
console.log('  reading:', reading);
console.log('  !!reading:', !!reading, ' - coerces to boolean, but 0 is falsy!');
console.log('  Use explicit checks instead: reading !== null && reading !== undefined');

console.log('\n--- || vs ?? (nullish coalescing) ---\n');

const sensorValue = 0;
const zone = '';

console.log(
  '  sensorValue || 42   =>',
  sensorValue || 42,
  '  - || replaces ANY falsy value',
);
console.log(
  '  sensorValue ?? 42   =>',
  sensorValue ?? 42,
  '   - ?? only replaces null/undefined',
);
console.log('  zone || "Unknown"   =>', zone || 'Unknown', '  - || treats "" as falsy');
console.log(
  '  zone ?? "Unknown"   =>',
  zone ?? 'Unknown',
  '  - ?? keeps "" because it is not null/undefined',
);

const config = { timeout: 0, retries: null };
console.log(
  '\n  config.timeout || 5000  =>',
  config.timeout || 5000,
  ' - oops, 0 was a valid timeout',
);
console.log(
  '  config.timeout ?? 5000  =>',
  config.timeout ?? 5000,
  '    - correct: 0 is kept',
);
console.log(
  '  config.retries ?? 3     =>',
  config.retries ?? 3,
  '    - null falls through to default',
);
