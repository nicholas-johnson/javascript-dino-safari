import { describe as d, it, expect } from 'vitest';
import { area, describe as describeShape, formatValue, getLength, summarise } from './shapes.js';

d('area', () => {
  it('computes circle area', () => {
    expect(area({ kind: 'circle', radius: 5 })).toBeCloseTo(78.54, 1);
  });
  it('computes rectangle area', () => {
    expect(area({ kind: 'rectangle', width: 4, height: 6 })).toBe(24);
  });
  it('computes triangle area', () => {
    expect(area({ kind: 'triangle', base: 10, height: 5 })).toBe(25);
  });
});

d('describe', () => {
  it('describes a circle', () => {
    expect(describeShape({ kind: 'circle', radius: 5 })).toBe('circle (r=5)');
  });
  it('describes a rectangle', () => {
    expect(describeShape({ kind: 'rectangle', width: 4, height: 6 })).toBe('rectangle (4x6)');
  });
  it('describes a triangle', () => {
    expect(describeShape({ kind: 'triangle', base: 10, height: 5 })).toBe('triangle (b=10, h=5)');
  });
});

d('formatValue', () => {
  it('uppercases strings', () => {
    expect(formatValue('hello')).toBe('HELLO');
  });
  it('formats numbers to 2 decimals', () => {
    expect(formatValue(3.14159)).toBe('3.14');
  });
  it('handles whole numbers', () => {
    expect(formatValue(42)).toBe('42.00');
  });
});

d('getLength', () => {
  it('returns string length', () => {
    expect(getLength('hello')).toBe(5);
  });
  it('returns array length', () => {
    expect(getLength([1, 2, 3])).toBe(3);
  });
  it('handles empty string', () => {
    expect(getLength('')).toBe(0);
  });
  it('handles empty array', () => {
    expect(getLength([])).toBe(0);
  });
});

d('summarise', () => {
  it('describes a string', () => {
    expect(summarise('hi')).toBe('string: "hi"');
  });
  it('describes a number', () => {
    expect(summarise(42)).toBe('number: 42');
  });
  it('describes a boolean', () => {
    expect(summarise(true)).toBe('boolean: true');
  });
});
