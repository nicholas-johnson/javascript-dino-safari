export function summarizeForRadio(dino) {
  const {
    name = 'Unknown asset',
    species = 'unknown species',
    zone = 'unassigned zone',
    dangerLevel,
    lastSeen,
  } = dino ?? {};

  const danger = dangerLevel ?? 0;
  const last = lastSeen ?? 'no recent ping';

  return `Ranger channel: ${name} (${species}) in ${zone} - risk ${danger}, last ${last}`;
}

export function mergeRangerNotes(base, patch) {
  return { ...base, ...patch };
}
