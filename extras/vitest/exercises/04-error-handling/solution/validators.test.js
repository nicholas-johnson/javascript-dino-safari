import { describe, it, expect } from 'vitest';
import {
  safeDivide,
  parseJSON,
  requirePositive,
  lookupById,
  createUser,
} from './validators.js';

describe('safeDivide', () => {
  it('divides two numbers', () => {
    expect(safeDivide(10, 2)).toBe(5);
  });

  it('throws when dividing by zero', () => {
    expect(() => safeDivide(10, 0)).toThrow('Cannot divide by zero');
  });
});

describe('parseJSON', () => {
  it('parses valid JSON', () => {
    expect(parseJSON('{"a":1}')).toEqual({ a: 1 });
  });

  it('parses a JSON array', () => {
    expect(parseJSON('[1,2,3]')).toEqual([1, 2, 3]);
  });

  it('throws on invalid JSON', () => {
    expect(() => parseJSON('not json')).toThrow('Invalid JSON');
  });

  it('throws on an empty string', () => {
    expect(() => parseJSON('')).toThrow('Invalid JSON');
  });
});

describe('requirePositive', () => {
  it('returns a positive number', () => {
    expect(requirePositive(5)).toBe(5);
  });

  it('throws for zero', () => {
    expect(() => requirePositive(0)).toThrow('Expected a positive number');
  });

  it('throws for negative numbers', () => {
    expect(() => requirePositive(-3)).toThrow('Expected a positive number');
  });

  it('throws for non-numbers', () => {
    expect(() => requirePositive('5')).toThrow('Expected a positive number');
  });
});

describe('lookupById', () => {
  const items = [
    { id: 1, name: 'Rex' },
    { id: 2, name: 'Trike' },
  ];

  it('finds an existing item', () => {
    expect(lookupById(items, 1)).toEqual({ id: 1, name: 'Rex' });
  });

  it('throws when the id is not found', () => {
    expect(() => lookupById(items, 99)).toThrow('Not found: 99');
  });

  it('throws on an empty collection', () => {
    expect(() => lookupById([], 1)).toThrow('Not found: 1');
  });
});

describe('createUser', () => {
  it('creates a user with name and email', () => {
    expect(createUser({ name: 'Ada', email: 'ada@example.com' })).toEqual({
      name: 'Ada',
      email: 'ada@example.com',
    });
  });

  it('throws when name is missing', () => {
    expect(() => createUser({ email: 'a@b.com' })).toThrow('name is required');
  });

  it('throws when email is missing', () => {
    expect(() => createUser({ name: 'Ada' })).toThrow('email is required');
  });

  it('throws when both are missing', () => {
    expect(() => createUser({})).toThrow('name is required');
  });
});
