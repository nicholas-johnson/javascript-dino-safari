export function formatSighting(dino) {
  const {
    trackingId = 'NO-ID',
    name = 'Unknown',
    species = 'unknown',
    zone = 'Unzoned',
    dangerLevel = 0,
  } = dino ?? {};

  return `[${trackingId}] ${name} — ${species} @ ${zone} (risk ${dangerLevel})`;
}
