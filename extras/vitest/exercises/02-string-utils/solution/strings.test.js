import { describe, it, expect } from 'vitest';
import {
  capitalize,
  slugify,
  truncate,
  countWords,
  reverse,
  isPalindrome,
  camelToKebab,
} from './strings.js';

describe('capitalize', () => {
  it('uppercases the first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('leaves an already-capitalized string unchanged', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('returns an empty string for empty input', () => {
    expect(capitalize('')).toBe('');
  });

  it('handles a single character', () => {
    expect(capitalize('a')).toBe('A');
  });
});

describe('slugify', () => {
  it('converts spaces to hyphens and lowercases', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('Dino Park! (2024)')).toBe('dino-park-2024');
  });

  it('collapses multiple spaces', () => {
    expect(slugify('too   many   spaces')).toBe('too-many-spaces');
  });

  it('trims leading and trailing whitespace', () => {
    expect(slugify('  padded  ')).toBe('padded');
  });
});

describe('truncate', () => {
  it('returns the full string when within limit', () => {
    expect(truncate('short', 10)).toBe('short');
  });

  it('truncates and appends ellipsis', () => {
    expect(truncate('hello world', 5)).toBe('hello…');
  });

  it('returns the string when exactly at max', () => {
    expect(truncate('exact', 5)).toBe('exact');
  });
});

describe('countWords', () => {
  it('counts words in a sentence', () => {
    expect(countWords('one two three')).toBe(3);
  });

  it('returns 0 for an empty string', () => {
    expect(countWords('')).toBe(0);
  });

  it('returns 0 for whitespace only', () => {
    expect(countWords('   ')).toBe(0);
  });

  it('handles extra whitespace between words', () => {
    expect(countWords('  lots   of   space  ')).toBe(3);
  });

  it('counts a single word', () => {
    expect(countWords('hello')).toBe(1);
  });
});

describe('reverse', () => {
  it('reverses a string', () => {
    expect(reverse('abcde')).toBe('edcba');
  });

  it('returns an empty string for empty input', () => {
    expect(reverse('')).toBe('');
  });

  it('handles a single character', () => {
    expect(reverse('x')).toBe('x');
  });
});

describe('isPalindrome', () => {
  it('detects a palindrome', () => {
    expect(isPalindrome('racecar')).toBe(true);
  });

  it('is case-insensitive', () => {
    expect(isPalindrome('Madam')).toBe(true);
  });

  it('rejects a non-palindrome', () => {
    expect(isPalindrome('hello')).toBe(false);
  });

  it('treats a single character as a palindrome', () => {
    expect(isPalindrome('a')).toBe(true);
  });
});

describe('camelToKebab', () => {
  it('converts camelCase to kebab-case', () => {
    expect(camelToKebab('backgroundColor')).toBe('background-color');
  });

  it('handles multiple humps', () => {
    expect(camelToKebab('borderTopLeftRadius')).toBe('border-top-left-radius');
  });

  it('returns a single word unchanged', () => {
    expect(camelToKebab('color')).toBe('color');
  });
});
