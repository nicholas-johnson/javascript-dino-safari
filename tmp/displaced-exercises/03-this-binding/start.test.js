import { describe, expect, it } from 'vitest';
import { addGuestAsCallback, createSafariTour } from './start.js';

describe('03-this-binding', () => {
  it('announce uses fields', () => {
    const tour = createSafariTour('Cretaceous Valley Run', 'Ranger Sam');
    expect(tour.announce()).toBe('Ranger Sam welcomes you to Cretaceous Valley Run');
  });

  it('scheduleBriefing callback preserves tour context', async () => {
    const tour = createSafariTour('Night Watch', 'Ranger Jo');
    await expect(tour.scheduleBriefing(5)).resolves.toBe(
      'Ranger Jo - Night Watch briefing begins',
    );
  });

  it('registerGuest works when detached', () => {
    const tour = createSafariTour('Kids Track', 'Ranger Pat');
    addGuestAsCallback(tour, 'Asha');
    expect(tour.guests).toEqual(['Asha']);
  });
});
