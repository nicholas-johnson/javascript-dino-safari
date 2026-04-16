import { describe, it, expect } from 'vitest';
import { describeDino, isDangerous, createDino, describeFlyer, getParkSummary } from './dinos.js';

describe('describeDino', () => {
  it('formats name and species', () => {
    const dino = { name: 'Rex', species: 'T-Rex', zone: 'Carnivore Cage', dangerLevel: 9 };
    expect(describeDino(dino)).toBe('Rex the T-Rex');
  });
});

describe('isDangerous', () => {
  it('returns true for dangerLevel >= 5', () => {
    expect(isDangerous({ name: 'Rex', species: 'T-Rex', zone: 'Cage', dangerLevel: 9 })).toBe(true);
  });
  it('returns false for dangerLevel < 5', () => {
    expect(isDangerous({ name: 'Trike', species: 'Triceratops', zone: 'Meadow', dangerLevel: 2 })).toBe(false);
  });
  it('returns true for exactly 5', () => {
    expect(isDangerous({ name: 'Raptor', species: 'Velociraptor', zone: 'Pen', dangerLevel: 5 })).toBe(true);
  });
});

describe('createDino', () => {
  it('returns a Dinosaur object', () => {
    const dino = createDino('Tank', 'Triceratops', 'Herbivore Meadow', 2);
    expect(dino).toEqual({
      name: 'Tank',
      species: 'Triceratops',
      zone: 'Herbivore Meadow',
      dangerLevel: 2,
    });
  });
});

describe('describeFlyer', () => {
  it('includes wingspan', () => {
    const flyer = { name: 'Skyler', species: 'Pteranodon', zone: 'Aviary', dangerLevel: 3, wingspanM: 6 };
    expect(describeFlyer(flyer)).toBe('Skyler the Pteranodon — wingspan 6m');
  });
});

describe('getParkSummary', () => {
  it('formats with capacity', () => {
    expect(getParkSummary({ name: 'Dino Park', id: 'dp-001', maxCapacity: 500 }))
      .toBe('Dino Park (id: dp-001) — capacity: 500');
  });
  it('shows unlimited when capacity is missing', () => {
    expect(getParkSummary({ name: 'Dino Park', id: 'dp-001' }))
      .toBe('Dino Park (id: dp-001) — capacity: unlimited');
  });
});
