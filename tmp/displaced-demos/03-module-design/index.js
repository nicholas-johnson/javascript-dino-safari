/**
 * Demo: clean module boundary - consumers only see explicit exports.
 */
import { getDino, listIds, registerDino } from './lib/dino-registry.js';

registerDino({
  trackingId: 'TRX-001',
  name: 'Rex',
  species: 'Tyrannosaurus',
  zone: 'Cretaceous Valley',
});

console.log('\n--- Module design demo ---');
console.log('Known IDs:', listIds());
console.log('Lookup:', getDino('TRX-001'));
