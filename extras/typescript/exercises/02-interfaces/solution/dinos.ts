export interface Dinosaur {
  name: string;
  species: string;
  zone: string;
  dangerLevel: number;
}

export interface FlyingDinosaur extends Dinosaur {
  wingspanM: number;
}

export interface ParkConfig {
  name: string;
  readonly id: string;
  maxCapacity?: number;
}

export const describeDino = (dino: Dinosaur): string =>
  `${dino.name} the ${dino.species}`;

export const isDangerous = (dino: Dinosaur): boolean =>
  dino.dangerLevel >= 5;

export const createDino = (
  name: string,
  species: string,
  zone: string,
  dangerLevel: number,
): Dinosaur => ({
  name,
  species,
  zone,
  dangerLevel,
});

export const describeFlyer = (dino: FlyingDinosaur): string =>
  `${dino.name} the ${dino.species} — wingspan ${dino.wingspanM}m`;

export const getParkSummary = (config: ParkConfig): string =>
  `${config.name} (id: ${config.id}) — capacity: ${config.maxCapacity ?? 'unlimited'}`;
