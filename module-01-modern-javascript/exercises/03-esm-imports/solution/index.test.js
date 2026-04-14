import pc from 'picocolors';
import { describe, expect, it } from 'vitest';
import { formatAlert, getExtension } from './index.js';

describe('03-esm-imports: formatAlert', () => {
  it('formats a full record with coloured risk label', () => {
    const result = formatAlert({ name: 'Rex', zone: 'Valley', dangerLevel: 5 });
    expect(result).toBe(`[${pc.red('CRITICAL')}] Rex @ Valley`);
  });

  it('uses yellow for danger level 2–3', () => {
    const result = formatAlert({ name: 'Stego', zone: 'Plains', dangerLevel: 2 });
    expect(result).toBe(`[${pc.yellow('MODERATE')}] Stego @ Plains`);
  });

  it('uses green for danger level 0–1', () => {
    const result = formatAlert({ name: 'Bronto', zone: 'Lake', dangerLevel: 1 });
    expect(result).toBe(`[${pc.green('LOW')}] Bronto @ Lake`);
  });

  it('applies defaults for null input', () => {
    const result = formatAlert(null);
    expect(result).toBe(`[${pc.green('NONE')}] Unknown @ Uncharted`);
  });

  it('applies defaults for undefined input', () => {
    const result = formatAlert(undefined);
    expect(result).toBe(`[${pc.green('NONE')}] Unknown @ Uncharted`);
  });

  it('applies defaults for empty object', () => {
    const result = formatAlert({});
    expect(result).toBe(`[${pc.green('NONE')}] Unknown @ Uncharted`);
  });

  it('does not treat dangerLevel 0 as missing', () => {
    const result = formatAlert({ name: 'Compy', zone: 'Nest', dangerLevel: 0 });
    expect(result).toBe(`[${pc.green('NONE')}] Compy @ Nest`);
  });
});

describe('03-esm-imports: getExtension', () => {
  it('returns .json for a JSON filename', () => {
    expect(getExtension('dinosaurs.json')).toBe('.json');
  });

  it('returns .js for a JavaScript filename', () => {
    expect(getExtension('index.js')).toBe('.js');
  });

  it('returns empty string when there is no extension', () => {
    expect(getExtension('Makefile')).toBe('');
  });
});
