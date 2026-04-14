import { describe, expect, it } from 'vitest';
import { shout, whisper, formatTag, containsWord, initials } from './strings.js';

describe('01-strings', () => {
  describe('shout', () => {
    it('uppercases and adds !', () => {
      expect(shout('hello')).toBe('HELLO!');
    });
    it('handles mixed case', () => {
      expect(shout('Perimeter Breach')).toBe('PERIMETER BREACH!');
    });
  });

  describe('whisper', () => {
    it('lowercases and wraps in parens', () => {
      expect(whisper('DANGER')).toBe('(danger)');
    });
    it('handles mixed case', () => {
      expect(whisper('All Clear')).toBe('(all clear)');
    });
  });

  describe('formatTag', () => {
    it('formats id and zone', () => {
      expect(formatTag('TRX-001', 'North Ridge')).toBe('[TRX-001] North Ridge');
    });
    it('handles another pair', () => {
      expect(formatTag('VLR-042', 'Paddock')).toBe('[VLR-042] Paddock');
    });
  });

  describe('containsWord', () => {
    it('returns true when word is present', () => {
      expect(containsWord('Rex spotted near fence', 'Rex')).toBe(true);
    });
    it('returns false when word is absent', () => {
      expect(containsWord('Rex spotted near fence', 'Bronto')).toBe(false);
    });
  });

  describe('initials', () => {
    it('extracts initials from two names', () => {
      expect(initials('Ellie Sattler')).toBe('E.S.');
    });
    it('extracts initials from three names', () => {
      expect(initials('Ian Malcolm Jr')).toBe('I.M.J.');
    });
  });
});
