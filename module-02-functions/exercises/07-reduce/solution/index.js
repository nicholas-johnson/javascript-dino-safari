export const sum = (numbers) => numbers.reduce((total, n) => total + n, 0);

export const countByZone = (dinos) =>
  dinos.reduce((acc, d) => {
    acc[d.zone] = (acc[d.zone] ?? 0) + 1;
    return acc;
  }, {});

export const maxDanger = (dinos) =>
  dinos.reduce((best, d) => (d.dangerLevel > best.dangerLevel ? d : best), dinos[0] ?? null);
