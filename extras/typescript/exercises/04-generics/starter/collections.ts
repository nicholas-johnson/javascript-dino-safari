// TODO: add generic type parameters to every function.

export const identity = (value) => value;

export const wrapInArray = (value) => [value];

export const first = (arr) => arr[0];

export const last = (arr) => arr[arr.length - 1];

export const mapArray = (arr, fn) => arr.map(fn);

export const filterArray = (arr, fn) => arr.filter(fn);

export const merge = (a, b) => ({ ...a, ...b });

export const lookup = (obj, key) => obj[key];
