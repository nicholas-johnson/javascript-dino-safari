import { describe, it, expect } from 'vitest';
import { formatAlert, isHighRisk } from './alert.js';

describe('formatAlert', () => {
  it('tags high-danger sightings', () => {
    const result = formatAlert({ name: 'Rex', zone: 'Valley', dangerLevel: 5 });
    expect(result).toBe('[DANGER] Rex spotted in Valley');
  });

  it('tags safe sightings', () => {
    const result = formatAlert({ name: 'Bronto', zone: 'Lake', dangerLevel: 1 });
    expect(result).toBe('[OK] Bronto spotted in Lake');
  });

  it('uses defaults for missing fields', () => {
    expect(formatAlert({})).toBe('[OK] Unknown spotted in Uncharted');
  });

  it('handles null input', () => {
    expect(formatAlert(null)).toBe('[OK] Unknown spotted in Uncharted');
  });
});

describe('isHighRisk', () => {
  it('returns true for danger level >= 4', () => {
    expect(isHighRisk({ dangerLevel: 4 })).toBe(true);
    expect(isHighRisk({ dangerLevel: 5 })).toBe(true);
  });

  it('returns false for lower levels', () => {
    expect(isHighRisk({ dangerLevel: 3 })).toBe(false);
  });

  it('treats missing dangerLevel as 0', () => {
    expect(isHighRisk({})).toBe(false);
    expect(isHighRisk(null)).toBe(false);
  });
});
