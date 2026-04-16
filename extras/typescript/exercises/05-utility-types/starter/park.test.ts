import { describe, it, expect } from 'vitest';
import { updateDino, getDinoSummary, getPublicInfo, createScoreboard, freezeConfig, withDefaults } from './park.js';

const rex = { name: 'Rex', species: 'T-Rex', zone: 'Carnivore Cage', dangerLevel: 9 };

describe('updateDino', () => {
  it('updates a single property', () => {
    expect(updateDino(rex, { zone: 'New Zone' })).toEqual({
      ...rex,
      zone: 'New Zone',
    });
  });
  it('returns unchanged dino for empty updates', () => {
    expect(updateDino(rex, {})).toEqual(rex);
  });
  it('updates multiple properties', () => {
    expect(updateDino(rex, { name: 'Rexy', dangerLevel: 10 })).toEqual({
      ...rex,
      name: 'Rexy',
      dangerLevel: 10,
    });
  });
});

describe('getDinoSummary', () => {
  it('returns only name and species', () => {
    expect(getDinoSummary(rex)).toEqual({ name: 'Rex', species: 'T-Rex' });
  });
});

describe('getPublicInfo', () => {
  it('removes dangerLevel', () => {
    const info = getPublicInfo(rex);
    expect(info).toEqual({ name: 'Rex', species: 'T-Rex', zone: 'Carnivore Cage' });
    expect(info).not.toHaveProperty('dangerLevel');
  });
});

describe('createScoreboard', () => {
  it('creates a scoreboard from names', () => {
    expect(createScoreboard(['Rex', 'Trike'], 0)).toEqual({ Rex: 0, Trike: 0 });
  });
  it('returns empty object for no names', () => {
    expect(createScoreboard([], 10)).toEqual({});
  });
});

describe('freezeConfig', () => {
  it('returns a frozen copy', () => {
    const config = { host: 'localhost', port: 3000 };
    const frozen = freezeConfig(config);
    expect(frozen).toEqual(config);
    expect(Object.isFrozen(frozen)).toBe(true);
  });
});

describe('withDefaults', () => {
  it('fills in missing properties', () => {
    expect(withDefaults({ name: 'Rex' })).toEqual({
      name: 'Rex',
      species: 'Unknown',
      zone: 'Unassigned',
      dangerLevel: 0,
    });
  });
  it('uses all defaults for empty input', () => {
    expect(withDefaults({})).toEqual({
      name: 'Unknown',
      species: 'Unknown',
      zone: 'Unassigned',
      dangerLevel: 0,
    });
  });
  it('preserves all provided properties', () => {
    expect(withDefaults(rex)).toEqual(rex);
  });
});
