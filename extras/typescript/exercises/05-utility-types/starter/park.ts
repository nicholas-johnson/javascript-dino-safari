// TODO: define the Dinosaur interface.
// Then annotate every function using utility types:
// Partial, Pick, Omit, Record, Readonly.

export const updateDino = (original, updates) => ({
  ...original,
  ...updates,
});

export const getDinoSummary = (dino) => ({
  name: dino.name,
  species: dino.species,
});

export const getPublicInfo = (dino) => {
  const { dangerLevel, ...rest } = dino;
  return rest;
};

export const createScoreboard = (names, score) => {
  const board = {};
  for (const name of names) {
    board[name] = score;
  }
  return board;
};

export const freezeConfig = (config) => Object.freeze(config);

export const withDefaults = (partial) => ({
  name: 'Unknown',
  species: 'Unknown',
  zone: 'Unassigned',
  dangerLevel: 0,
  ...partial,
});
