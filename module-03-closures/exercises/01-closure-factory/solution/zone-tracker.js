export function createZoneTracker(zoneName) {
  const sightings = [];

  return {
    logSighting(assetId, note) {
      sightings.push({ assetId, note });
    },
    getSightings() {
      return [...sightings];
    },
    getCount() {
      return sightings.length;
    },
  };
}
