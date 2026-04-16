export const unique = (arr) => [...new Set(arr)];

export const chunk = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export const flatten = (arr) => arr.flat(Infinity);

export const compact = (arr) => arr.filter(Boolean);

export const intersection = (a, b) => {
  const setB = new Set(b);
  return [...new Set(a)].filter((v) => setB.has(v));
};

export const zip = (a, b) => {
  const len = Math.min(a.length, b.length);
  return Array.from({ length: len }, (_, i) => [a[i], b[i]]);
};

export const range = (start, end, step = 1) => {
  const result = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
};
