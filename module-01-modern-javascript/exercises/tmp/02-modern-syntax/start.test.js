import { describe, expect, it } from 'vitest';
import { mergeRangerNotes, summarizeForRadio } from './start.js';

describe('02-modern-syntax', () => {
  it('summarizeForRadio formats with defaults', () => {
    expect(summarizeForRadio(null)).toBe(
      'Ranger channel: Unknown asset (unknown species) in unassigned zone - risk 0, last no recent ping',
    );
  });

  it('summarizeForRadio uses all fields when present', () => {
    expect(
      summarizeForRadio({
        name: 'Rex',
        species: 'Tyrannosaurus',
        zone: 'Cretaceous Valley',
        dangerLevel: 5,
        lastSeen: '2024-03-15T09:30:00Z',
      }),
    ).toBe(
      'Ranger channel: Rex (Tyrannosaurus) in Cretaceous Valley - risk 5, last 2024-03-15T09:30:00Z',
    );
  });

  it('mergeRangerNotes shallow-merges without mutating inputs', () => {
    const base = { name: 'Blue', zone: 'Raptor Ridge' };
    const patch = { notes: 'Fast' };
    const out = mergeRangerNotes(base, patch);
    expect(out).toEqual({ name: 'Blue', zone: 'Raptor Ridge', notes: 'Fast' });
    expect(base).toEqual({ name: 'Blue', zone: 'Raptor Ridge' });
    expect(patch).toEqual({ notes: 'Fast' });
  });
});
