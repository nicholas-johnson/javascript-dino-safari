import { describe, expect, it } from 'vitest';
import { doubleAll, extractNames, formatSightings } from './mappers.js';

describe('04-map', () => {
  describe('doubleAll', () => {
    it('doubles every number', () => {
      expect(doubleAll([1, 2, 3])).toEqual([2, 4, 6]);
    });
    it('handles empty array', () => {
      expect(doubleAll([])).toEqual([]);
    });
    it('handles negative numbers', () => {
      expect(doubleAll([-1, 0, 5])).toEqual([-2, 0, 10]);
    });
  });

  describe('extractNames', () => {
    it('extracts species strings', () => {
      const dinos = [
        { species: 'Rex', zone: 'North' },
        { species: 'Bronto', zone: 'Lake' },
      ];
      expect(extractNames(dinos)).toEqual(['Rex', 'Bronto']);
    });
    it('returns empty for empty array', () => {
      expect(extractNames([])).toEqual([]);
    });
  });

  describe('formatSightings', () => {
    it('formats each dino as a string', () => {
      const dinos = [
        { species: 'Rex', zone: 'North', dangerLevel: 9 },
        { species: 'Compy', zone: 'South', dangerLevel: 2 },
      ];
      expect(formatSightings(dinos)).toEqual([
        'Rex (North) - danger: 9',
        'Compy (South) - danger: 2',
      ]);
    });
  });
});
