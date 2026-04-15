import { describe, expect, it } from 'vitest';
import { sum, countByZone, maxDanger } from './reducers.js';

describe('05-reduce', () => {
  describe('sum', () => {
    it('sums positive numbers', () => {
      expect(sum([1, 2, 3, 4])).toBe(10);
    });
    it('returns 0 for empty array', () => {
      expect(sum([])).toBe(0);
    });
    it('handles negative numbers', () => {
      expect(sum([5, -3, 2])).toBe(4);
    });
  });

  describe('countByZone', () => {
    it('counts dinos per zone', () => {
      const dinos = [
        { species: 'Rex', zone: 'North' },
        { species: 'Raptor', zone: 'North' },
        { species: 'Bronto', zone: 'Lake' },
        { species: 'Stego', zone: 'Lake' },
        { species: 'Compy', zone: 'South' },
      ];
      expect(countByZone(dinos)).toEqual({ North: 2, Lake: 2, South: 1 });
    });
    it('returns empty object for empty array', () => {
      expect(countByZone([])).toEqual({});
    });
  });

  describe('maxDanger', () => {
    it('returns the dino with highest dangerLevel', () => {
      const dinos = [
        { species: 'Compy', dangerLevel: 2 },
        { species: 'Rex', dangerLevel: 9 },
        { species: 'Raptor', dangerLevel: 7 },
      ];
      expect(maxDanger(dinos)).toEqual({ species: 'Rex', dangerLevel: 9 });
    });
    it('returns null for empty array', () => {
      expect(maxDanger([])).toBeNull();
    });
    it('returns the only element for single-item array', () => {
      expect(maxDanger([{ species: 'Solo', dangerLevel: 5 }])).toEqual({
        species: 'Solo',
        dangerLevel: 5,
      });
    });
  });
});
