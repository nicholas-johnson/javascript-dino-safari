export const capitalize = (str) =>
  str.length === 0 ? '' : str[0].toUpperCase() + str.slice(1);

export const slugify = (str) =>
  str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

export const truncate = (str, max) =>
  str.length <= max ? str : str.slice(0, max) + '…';

export const countWords = (str) => {
  const trimmed = str.trim();
  if (trimmed === '') return 0;
  return trimmed.split(/\s+/).length;
};

export const reverse = (str) => [...str].reverse().join('');

export const isPalindrome = (str) => {
  const cleaned = str.toLowerCase();
  return cleaned === [...cleaned].reverse().join('');
};

export const camelToKebab = (str) =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
