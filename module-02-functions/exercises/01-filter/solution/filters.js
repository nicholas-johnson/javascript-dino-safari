export const keepEvens = (numbers) => numbers.filter((n) => n % 2 === 0);

export const overlap = (a, b) => a.filter((n) => b.includes(n));

export const getDangerous = (dinos) => dinos.filter((d) => d.dangerLevel > 5);
