export interface Dinosaur {
  name: string;
  species: string;
  zone: string;
  dangerLevel: number;
}

export const updateDino = (
  original: Dinosaur,
  updates: Partial<Dinosaur>,
): Dinosaur => ({
  ...original,
  ...updates,
});

export const getDinoSummary = (
  dino: Dinosaur,
): Pick<Dinosaur, 'name' | 'species'> => ({
  name: dino.name,
  species: dino.species,
});

export const getPublicInfo = (
  dino: Dinosaur,
): Omit<Dinosaur, 'dangerLevel'> => {
  const { dangerLevel, ...rest } = dino;
  return rest;
};

export const createScoreboard = (
  names: string[],
  score: number,
): Record<string, number> => {
  const board: Record<string, number> = {};
  for (const name of names) {
    board[name] = score;
  }
  return board;
};

export const freezeConfig = <T extends object>(config: T): Readonly<T> =>
  Object.freeze(config);

export const withDefaults = (partial: Partial<Dinosaur>): Dinosaur => ({
  name: 'Unknown',
  species: 'Unknown',
  zone: 'Unassigned',
  dangerLevel: 0,
  ...partial,
});
