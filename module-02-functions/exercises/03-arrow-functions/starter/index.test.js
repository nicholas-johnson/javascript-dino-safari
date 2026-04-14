import { describe, expect, it } from 'vitest';
import { double, square, add, hello, formatSighting } from './index.js';

describe('01-arrow-functions', () => {
  describe('double', () => {
    it('doubles a positive number', () => {
      expect(double(5)).toBe(10);
    });
    it('doubles zero', () => {
      expect(double(0)).toBe(0);
    });
    it('doubles a negative number', () => {
      expect(double(-3)).toBe(-6);
    });
  });

  describe('square', () => {
    it('squares a number', () => {
      expect(square(4)).toBe(16);
    });
    it('squares zero', () => {
      expect(square(0)).toBe(0);
    });
    it('squares a negative number', () => {
      expect(square(-3)).toBe(9);
    });
  });

  describe('add', () => {
    it('adds two numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
    it('adds negative numbers', () => {
      expect(add(-1, -4)).toBe(-5);
    });
  });

  describe('hello', () => {
    it('greets by name', () => {
      expect(hello('Ellie')).toBe('Hello, Ellie!');
    });
    it('greets another name', () => {
      expect(hello('Malcolm')).toBe('Hello, Malcolm!');
    });
  });

  describe('formatSighting', () => {
    it('formats a sighting string', () => {
      expect(formatSighting('Rex', 'North Ridge')).toBe('Rex spotted in North Ridge');
    });
    it('formats another sighting', () => {
      expect(formatSighting('Compy', 'South Valley')).toBe('Compy spotted in South Valley');
    });
  });
});
