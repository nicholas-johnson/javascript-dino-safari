/**
 * Demo: Closures - private state via createZoneTracker.
 * Run: node module-03-closures/demo/01-closures
 */
function createZoneTracker(zoneName) {
  const sightings = [];

  function logSighting(assetId, note) {
    sightings.push({ assetId, note, at: new Date().toISOString() });
    console.log(`[${zoneName}] logged ${assetId}: ${note}`);
  }

  function getSightings() {
    return [...sightings];
  }

  function count() {
    return sightings.length;
  }

  return { logSighting, getSightings, count };
}

const ridge = createZoneTracker('Raptor Ridge');
const valley = createZoneTracker('Cretaceous Valley');

ridge.logSighting('VLR-042', 'Pack moving east');
ridge.logSighting('VLR-042', 'Holding at fence line');
valley.logSighting('TRX-001', 'Thermal bloom near watering hole');

console.log('\n--- Closure demo ---');
console.log('Ridge count:', ridge.count());
console.log('Valley count:', valley.count());
console.log('Ridge snapshot:', ridge.getSightings());
