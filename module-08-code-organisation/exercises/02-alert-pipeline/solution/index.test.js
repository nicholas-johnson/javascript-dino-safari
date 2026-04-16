import { describe, expect, it } from 'vitest';
import {
  createDeduplicator,
  normaliseAlert,
  validateAlert,
} from './alerts/index.js';
import { processAlerts } from './pipeline/index.js';

describe('validateAlert', () => {
  it('accepts a fully valid alert', () => {
    expect(
      validateAlert({ zone: 'North Ridge', level: 3, timestamp: 1 }),
    ).toBe(true);
  });

  it('rejects missing or empty zone', () => {
    expect(validateAlert({ level: 1, timestamp: 1 })).toBe(false);
    expect(validateAlert({ zone: '', level: 1, timestamp: 1 })).toBe(false);
    expect(validateAlert({ zone: '   ', level: 1, timestamp: 1 })).toBe(false);
  });

  it('rejects missing or invalid level', () => {
    expect(validateAlert({ zone: 'a', timestamp: 1 })).toBe(false);
    expect(validateAlert({ zone: 'a', level: 0, timestamp: 1 })).toBe(false);
    expect(validateAlert({ zone: 'a', level: 6, timestamp: 1 })).toBe(false);
    expect(validateAlert({ zone: 'a', level: 2.5, timestamp: 1 })).toBe(false);
  });

  it('rejects missing or non-positive timestamp', () => {
    expect(validateAlert({ zone: 'a', level: 1 })).toBe(false);
    expect(validateAlert({ zone: 'a', level: 1, timestamp: 0 })).toBe(false);
    expect(validateAlert({ zone: 'a', level: 1, timestamp: -1 })).toBe(false);
  });
});

describe('normaliseAlert', () => {
  it('trims and lowercases zone, adds id, and does not mutate the original', () => {
    const original = { zone: '  East Wing  ', level: 2, timestamp: 99 };
    const copy = { ...original };
    const out = normaliseAlert(original);

    expect(original).toEqual(copy);
    expect(out).toEqual({
      zone: 'east wing',
      level: 2,
      timestamp: 99,
      id: 'east wing-99',
    });
  });
});

describe('createDeduplicator', () => {
  it('returns true the first time an id is seen and false on repeats', () => {
    const dedupe = createDeduplicator();
    const a = { id: 'z-1', zone: 'z', level: 1, timestamp: 1 };
    const b = { id: 'z-1', zone: 'z', level: 1, timestamp: 1 };

    expect(dedupe(a)).toBe(true);
    expect(dedupe(b)).toBe(false);
  });

  it('allows different ids', () => {
    const dedupe = createDeduplicator();
    expect(dedupe({ id: 'a-1' })).toBe(true);
    expect(dedupe({ id: 'b-2' })).toBe(true);
  });
});

const rawFixture = [
  { zone: ' North Ridge ', level: 5, timestamp: 1000 },
  { zone: 'North Ridge', level: 5, timestamp: 1000 },
  { zone: 'south-valley', level: 2, timestamp: 2000 },
  { zone: 'East Wing', level: 1, timestamp: 3000 },
  { zone: '', level: 3, timestamp: 4000 },
  { zone: 'West Gate', level: 4, timestamp: 5000 },
];

describe('processAlerts', () => {
  it('runs validate → normalise → dedupe → categorise end-to-end', () => {
    const result = processAlerts(rawFixture);

    expect(result.total).toBe(4);
    expect(result.critical).toHaveLength(2);
    expect(result.warning).toHaveLength(1);
    expect(result.info).toHaveLength(1);

    expect(result.critical.map((a) => a.id).sort()).toEqual([
      'north ridge-1000',
      'west gate-5000',
    ]);
    expect(result.warning[0].id).toBe('south-valley-2000');
    expect(result.info[0].id).toBe('east wing-3000');
  });

  it('returns empty buckets and total 0 for an empty array', () => {
    expect(processAlerts([])).toEqual({
      critical: [],
      warning: [],
      info: [],
      total: 0,
    });
  });
});
