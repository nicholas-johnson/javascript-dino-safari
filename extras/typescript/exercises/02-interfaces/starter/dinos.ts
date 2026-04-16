// TODO: define Dinosaur, FlyingDinosaur, and ParkConfig interfaces.
// Then add type annotations to every function.

export const describeDino = (dino) =>
  `${dino.name} the ${dino.species}`;

export const isDangerous = (dino) =>
  dino.dangerLevel >= 5;

export const createDino = (name, species, zone, dangerLevel) => ({
  name,
  species,
  zone,
  dangerLevel,
});

export const describeFlyer = (dino) =>
  `${dino.name} the ${dino.species} — wingspan ${dino.wingspanM}m`;

export const getParkSummary = (config) =>
  `${config.name} (id: ${config.id}) — capacity: ${config.maxCapacity ?? 'unlimited'}`;
