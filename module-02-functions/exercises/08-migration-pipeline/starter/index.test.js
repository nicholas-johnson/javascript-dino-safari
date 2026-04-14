import { describe, expect, it } from 'vitest';
import { buildMigrationReport, countByZone, filterHighRiskZones, toLogLines } from './index.js';

const sample = [
  { zone: 'north', headcount: 12, risk: 'high' },
  { zone: 'north', headcount: 3, risk: 'low' },
  { zone: 'south', headcount: 0, risk: 'high' },
  { zone: 'south', headcount: 5, risk: 'high' },
];

describe('02-map-filter-reduce', () => {
  it('filterHighRiskZones', () => {
    expect(filterHighRiskZones(sample)).toEqual([
      { zone: 'north', headcount: 12, risk: 'high' },
      { zone: 'south', headcount: 5, risk: 'high' },
    ]);
  });

  it('toLogLines', () => {
    expect(
      toLogLines([
        { zone: 'ridge', headcount: 2, risk: 'high' },
        { zone: 'valley', headcount: 9, risk: 'high' },
      ]),
    ).toEqual(['ridge: 2 animals', 'valley: 9 animals']);
  });

  it('countByZone', () => {
    expect(
      countByZone([
        { zone: 'a', headcount: 2, risk: 'high' },
        { zone: 'b', headcount: 3, risk: 'high' },
        { zone: 'a', headcount: 1, risk: 'high' },
      ]),
    ).toEqual({ a: 3, b: 3 });
  });

  it('buildMigrationReport composes filtered data', () => {
    expect(buildMigrationReport(sample)).toEqual({
      lines: ['north: 12 animals', 'south: 5 animals'],
      totals: { north: 12, south: 5 },
    });
  });
});
