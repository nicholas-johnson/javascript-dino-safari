import { describe, expect, it } from 'vitest';
import { keepEvens, overlap, getDangerous } from './filters.js';

describe('02-filter', () => {
  describe('keepEvens', () => {
    it('keeps only even numbers', () => {
      expect(keepEvens([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
    });
    it('returns empty for all odd', () => {
      expect(keepEvens([1, 3, 5])).toEqual([]);
    });
    it('handles empty array', () => {
      expect(keepEvens([])).toEqual([]);
    });
  });

  describe('overlap', () => {
    it('returns shared elements', () => {
      expect(overlap([1, 2, 3, 4], [3, 4, 5, 6])).toEqual([3, 4]);
    });
    it('returns empty when no overlap', () => {
      expect(overlap([1, 2], [3, 4])).toEqual([]);
    });
    it('handles duplicates in first array', () => {
      expect(overlap([1, 1, 2], [1, 3])).toEqual([1, 1]);
    });
  });

  describe('getDangerous', () => {
    const dinos = [
      { species: 'Rex', zone: 'North', dangerLevel: 9 },
      { species: 'Bronto', zone: 'Lake', dangerLevel: 1 },
      { species: 'Raptor', zone: 'Ridge', dangerLevel: 7 },
      { species: 'Compy', zone: 'South', dangerLevel: 3 },
    ];

    it('filters dinos with dangerLevel > 5', () => {
      expect(getDangerous(dinos)).toEqual([
        { species: 'Rex', zone: 'North', dangerLevel: 9 },
        { species: 'Raptor', zone: 'Ridge', dangerLevel: 7 },
      ]);
    });
    it('returns empty for safe dinos', () => {
      expect(getDangerous([{ species: 'Stego', zone: 'Meadow', dangerLevel: 2 }])).toEqual([]);
    });
  });
});
