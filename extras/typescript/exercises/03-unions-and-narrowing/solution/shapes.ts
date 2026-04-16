export type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };

export const area = (shape: Shape): number => {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    case 'triangle':
      return (shape.base * shape.height) / 2;
  }
};

export const describe = (shape: Shape): string => {
  switch (shape.kind) {
    case 'circle':
      return `circle (r=${shape.radius})`;
    case 'rectangle':
      return `rectangle (${shape.width}x${shape.height})`;
    case 'triangle':
      return `triangle (b=${shape.base}, h=${shape.height})`;
  }
};

export const formatValue = (value: string | number): string => {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value.toFixed(2);
};

export const getLength = (value: string | unknown[]): number => {
  return value.length;
};

export const summarise = (item: string | number | boolean): string => {
  if (typeof item === 'string') {
    return `string: "${item}"`;
  }
  if (typeof item === 'number') {
    return `number: ${item}`;
  }
  return `boolean: ${item}`;
};
