/**
 * MONOLITH (messy on purpose) - student should refactor out of this file.
 *
 * @param {string[]} zonesRaw
 * @param {{ zone: string, level: number }[]} pings
 */
export function compileDigest(zonesRaw, pings) {
  const seen = {};
  for (let i = 0; i < zonesRaw.length; i++) {
    const z = String(zonesRaw[i]).trim().toLowerCase();
    if (!z) continue;
    seen[z] = true;
  }
  const zones = Object.keys(seen)
    .map((z) => z.toUpperCase())
    .sort();

  const alertsByZone = {};
  for (let j = 0; j < pings.length; j++) {
    const p = pings[j];
    const key = String(p.zone).trim().toLowerCase();
    if (!key) continue;
    if (p.level >= 4) {
      const prev = alertsByZone[key];
      alertsByZone[key] = (prev ?? 0) + 1;
    }
  }

  return { zones, alertsByZone };
}
