import { describe, expect, it } from 'vitest';
import { add, multiply, greet, isEven, initials } from './index.js';

describe('01-function-intro', () => {
  describe('add', () => {
    it('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
    it('adds with zero', () => {
      expect(add(0, 7)).toBe(7);
    });
    it('adds negative numbers', () => {
      expect(add(-1, -4)).toBe(-5);
    });
  });

  describe('multiply', () => {
    it('multiplies two numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });
    it('multiplies by zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });
    it('multiplies negatives', () => {
      expect(multiply(-2, 3)).toBe(-6);
    });
  });

  describe('greet', () => {
    it('greets a ranger', () => {
      expect(greet('Ellie')).toBe('Hello, Ellie!');
    });
    it('greets another ranger', () => {
      expect(greet('Alan')).toBe('Hello, Alan!');
    });
  });

  describe('isEven', () => {
    it('returns true for even', () => {
      expect(isEven(4)).toBe(true);
    });
    it('returns false for odd', () => {
      expect(isEven(7)).toBe(false);
    });
    it('zero is even', () => {
      expect(isEven(0)).toBe(true);
    });
  });

  describe('initials', () => {
    it('returns initials with dots', () => {
      expect(initials('Ellie', 'Sattler')).toBe('E.S.');
    });
    it('handles another pair', () => {
      expect(initials('ian', 'malcolm')).toBe('I.M.');
    });
  });
});
