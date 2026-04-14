/**
 * Demo: Immutability - spread vs structuredClone, don't-mutate-inputs.
 * Run: node module-03-closures/demo/03-immutability
 */
const dino = { name: 'Rex', vitals: { weightKg: 8000 } };

const shallow = { ...dino, zone: 'CV' };
// shallow.vitals still shared
shallow.vitals.weightKg = 8100;
console.log('\n--- Immutability demo ---');
console.log('original vitals weight after shallow tweak:', dino.vitals.weightKg);

const deep = structuredClone(dino);
deep.vitals.weightKg = 8200;
console.log(
  'after structuredClone isolation:',
  dino.vitals.weightKg,
  deep.vitals.weightKg,
);
