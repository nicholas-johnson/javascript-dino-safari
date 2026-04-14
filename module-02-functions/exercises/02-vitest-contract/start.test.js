import { describe, expect, it } from 'vitest';
import { formatSighting } from './start.js';

describe('02-vitest-contract: formatSighting', () => {
  it('formats a full record', () => {
    expect(
      formatSighting({
        trackingId: 'TRX-001',
        name: 'Rex',
        species: 'Tyrannosaurus',
        zone: 'Cretaceous Valley',
        dangerLevel: 5,
      }),
    ).toBe('[TRX-001] Rex — Tyrannosaurus @ Cretaceous Valley (risk 5)');
  });

  it('applies nullish defaults', () => {
    expect(formatSighting({})).toBe('[NO-ID] Unknown — unknown @ Unzoned (risk 0)');
    expect(formatSighting(null)).toBe('[NO-ID] Unknown — unknown @ Unzoned (risk 0)');
  });

  it('does not treat 0 as missing for dangerLevel', () => {
    expect(
      formatSighting({
        trackingId: 'X',
        name: 'A',
        species: 'B',
        zone: 'Z',
        dangerLevel: 0,
      }),
    ).toBe('[X] A — B @ Z (risk 0)');
  });
});
