export function createSafariTour(title, guide) {
  const tour = {
    title,
    guide,
    guests: [],

    announce() {
      return `${this.guide} welcomes you to ${this.title}`;
    },

    scheduleBriefing(delayMs) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(`${this.guide} - ${this.title} briefing begins`);
        }, delayMs);
      });
    },

    registerGuest(name) {
      this.guests.push(name);
    },
  };

  tour.registerGuest = tour.registerGuest.bind(tour);
  return tour;
}

export function addGuestAsCallback(tour, name) {
  const fn = tour.registerGuest;
  fn(name);
}
