/**
 * @param {string} zoneName
 * @returns {{
 *   logSighting: (assetId: string, note: string) => void,
 *   getSightings: () => { assetId: string, note: string }[],
 *   getCount: () => number
 * }}
 */
export function createZoneTracker(_zoneName) {
  // TODO
  return {
    logSighting() {},
    getSightings() {
      return [];
    },
    getCount() {
      return 0;
    },
  };
}
