import { describe, expect, it } from 'vitest';
import { sortNumbers, sortByDanger, sortByName } from './index.js';

describe('03-sort', () => {
  describe('sortNumbers', () => {
    it('sorts numbers ascending', () => {
      expect(sortNumbers([10, 1, 21, 2])).toEqual([1, 2, 10, 21]);
    });
    it('handles negative numbers', () => {
      expect(sortNumbers([3, -1, 0, 5])).toEqual([-1, 0, 3, 5]);
    });
    it('handles empty array', () => {
      expect(sortNumbers([])).toEqual([]);
    });
  });

  describe('sortByDanger', () => {
    it('sorts by dangerLevel descending', () => {
      const dinos = [
        { species: 'Compy', dangerLevel: 2 },
        { species: 'Rex', dangerLevel: 9 },
        { species: 'Raptor', dangerLevel: 7 },
      ];
      expect(sortByDanger(dinos)).toEqual([
        { species: 'Rex', dangerLevel: 9 },
        { species: 'Raptor', dangerLevel: 7 },
        { species: 'Compy', dangerLevel: 2 },
      ]);
    });
  });

  describe('sortByName', () => {
    it('sorts alphabetically by species', () => {
      const dinos = [
        { species: 'Triceratops', dangerLevel: 3 },
        { species: 'Allosaurus', dangerLevel: 8 },
        { species: 'Brachiosaurus', dangerLevel: 1 },
      ];
      expect(sortByName(dinos)).toEqual([
        { species: 'Allosaurus', dangerLevel: 8 },
        { species: 'Brachiosaurus', dangerLevel: 1 },
        { species: 'Triceratops', dangerLevel: 3 },
      ]);
    });
  });
});
