export const identity = <T>(value: T): T => value;

export const wrapInArray = <T>(value: T): T[] => [value];

export const first = <T>(arr: T[]): T | undefined => arr[0];

export const last = <T>(arr: T[]): T | undefined => arr[arr.length - 1];

export const mapArray = <T, U>(arr: T[], fn: (item: T) => U): U[] =>
  arr.map(fn);

export const filterArray = <T>(arr: T[], fn: (item: T) => boolean): T[] =>
  arr.filter(fn);

export const merge = <T extends object, U extends object>(a: T, b: U): T & U =>
  ({ ...a, ...b }) as T & U;

export const lookup = <T, K extends keyof T>(obj: T, key: K): T[K] =>
  obj[key];
