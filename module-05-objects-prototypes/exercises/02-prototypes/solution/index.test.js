import { describe, expect, it } from 'vitest';
import { Dinosaur, FlyingDinosaur } from './dinosaur.js';

describe('02-classes', () => {
  it('Dinosaur.describe', () => {
    const d = new Dinosaur('Tank', 'Triceratops', 'Herbivore Meadow');
    expect(d.describe()).toBe('Tank - Triceratops @ Herbivore Meadow');
    expect(d).toBeInstanceOf(Dinosaur);
  });

  it('FlyingDinosaur inherits and overrides describe', () => {
    const p = new FlyingDinosaur('Skyler', 'Pteranodon', 'Aviary Ascent', 6);
    expect(p).toBeInstanceOf(FlyingDinosaur);
    expect(p).toBeInstanceOf(Dinosaur);
    expect(p.wingspanM).toBe(6);
    expect(p.describe()).toBe('Skyler - Pteranodon @ Aviary Ascent - wingspan 6m');
  });
});
