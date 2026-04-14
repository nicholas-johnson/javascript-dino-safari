export function createSafariTour(title, guide) {
  return {
    title,
    guide,
    guests: [],

    announce() {
      return `${this.guide} welcomes you to ${this.title}`;
    },

    scheduleBriefing(delayMs) {
      return new Promise((resolve) => {
        setTimeout(function () {
          resolve(`${this.guide} - ${this.title} briefing begins`);
        }, delayMs);
      });
    },

    registerGuest(name) {
      this.guests.push(name);
    },
  };
}

/** Simulates passing registerGuest as a callback without tour as receiver */
export function addGuestAsCallback(tour, name) {
  const fn = tour.registerGuest;
  fn(name);
}
