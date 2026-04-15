export const sortNumbers = (numbers) => numbers.sort((a, b) => a - b);

export const sortByDanger = (dinos) => dinos.sort((a, b) => b.dangerLevel - a.dangerLevel);

export const sortByName = (dinos) => dinos.sort((a, b) => a.species.localeCompare(b.species));
