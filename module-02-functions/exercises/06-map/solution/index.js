export const doubleAll = (numbers) => numbers.map((n) => n * 2);

export const extractNames = (dinos) => dinos.map((d) => d.species);

export const formatSightings = (dinos) =>
  dinos.map((d) => `${d.species} (${d.zone}) — danger: ${d.dangerLevel}`);
