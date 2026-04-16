import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AppError } from './errors/index.js';
import { loadConfig } from './config/index.js';
import { createLogger } from './logging/index.js';

describe('AppError', () => {
  it('is an Error with code and message', () => {
    const err = new AppError('E_CODE', 'Something failed');
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(AppError);
    expect(err.name).toBe('AppError');
    expect(err.code).toBe('E_CODE');
    expect(err.message).toBe('Something failed');
  });
});

describe('loadConfig', () => {
  it('throws CONFIG_MISSING when PARK_NAME is missing', () => {
    expect(() => loadConfig({})).toThrow(AppError);
    try {
      loadConfig({});
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
      expect(e.code).toBe('CONFIG_MISSING');
      expect(e.message).toBe('PARK_NAME is required');
    }
  });

  it('throws CONFIG_MISSING when PARK_NAME is only whitespace', () => {
    expect(() => loadConfig({ PARK_NAME: '   ' })).toThrow(AppError);
    try {
      loadConfig({ PARK_NAME: '   ' });
    } catch (e) {
      expect(e.code).toBe('CONFIG_MISSING');
    }
  });

  it('throws CONFIG_INVALID for non-positive integer API_PORT', () => {
    expect(() =>
      loadConfig({ PARK_NAME: 'Test', API_PORT: '0' }),
    ).toThrow(AppError);
    try {
      loadConfig({ PARK_NAME: 'Test', API_PORT: '0' });
    } catch (e) {
      expect(e.code).toBe('CONFIG_INVALID');
      expect(e.message).toBe('API_PORT must be a positive integer');
    }
  });

  it('throws CONFIG_INVALID for non-numeric API_PORT', () => {
    expect(() =>
      loadConfig({ PARK_NAME: 'Test', API_PORT: 'nope' }),
    ).toThrow(AppError);
    try {
      loadConfig({ PARK_NAME: 'Test', API_PORT: 'nope' });
    } catch (e) {
      expect(e.code).toBe('CONFIG_INVALID');
    }
  });

  it('throws CONFIG_INVALID for invalid LOG_LEVEL', () => {
    expect(() =>
      loadConfig({ PARK_NAME: 'Test', LOG_LEVEL: 'verbose' }),
    ).toThrow(AppError);
    try {
      loadConfig({ PARK_NAME: 'Test', LOG_LEVEL: 'verbose' });
    } catch (e) {
      expect(e.code).toBe('CONFIG_INVALID');
      expect(e.message).toBe('LOG_LEVEL must be debug, info, warn, or error');
    }
  });

  it('returns the expected shape for a valid env', () => {
    const config = loadConfig({
      PARK_NAME: 'Dino Safari',
      API_PORT: '3000',
      LOG_LEVEL: 'info',
    });
    expect(config).toEqual({
      parkName: 'Dino Safari',
      apiPort: 3000,
      logLevel: 'info',
    });
  });

  it('applies defaults for API_PORT and LOG_LEVEL', () => {
    const config = loadConfig({ PARK_NAME: 'Park' });
    expect(config.apiPort).toBe(8080);
    expect(config.logLevel).toBe('info');
    expect(config.parkName).toBe('Park');
  });
});

describe('createLogger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('formats info with meta and sorts keys', () => {
    const config = loadConfig({
      PARK_NAME: 'Test Park',
      API_PORT: '1',
      LOG_LEVEL: 'info',
    });
    const log = createLogger(config);
    const line = log.info('Hello', { zebra: 1, apple: 2 });
    expect(line).toBe('[INFO] [Test Park] Hello | apple=2 zebra=1');
  });

  it('omits the meta section when meta is empty or omitted', () => {
    const config = loadConfig({ PARK_NAME: 'P', API_PORT: '1', LOG_LEVEL: 'info' });
    const log = createLogger(config);
    expect(log.info('No meta')).toBe('[INFO] [P] No meta');
    expect(log.info('Empty', {})).toBe('[INFO] [P] Empty');
  });

  it('returns null for debug when configured level is info', () => {
    const config = loadConfig({ PARK_NAME: 'P', API_PORT: '1', LOG_LEVEL: 'info' });
    const log = createLogger(config);
    expect(log.debug('x')).toBeNull();
  });

  it('returns a string for warn when configured level is info', () => {
    const config = loadConfig({ PARK_NAME: 'P', API_PORT: '1', LOG_LEVEL: 'info' });
    const log = createLogger(config);
    expect(log.warn('careful')).toBe('[WARN] [P] careful');
  });

  it('returns a string for error when configured level is info', () => {
    const config = loadConfig({ PARK_NAME: 'P', API_PORT: '1', LOG_LEVEL: 'info' });
    const log = createLogger(config);
    expect(log.error('boom')).toBe('[ERROR] [P] boom');
  });

  it('with log level debug, all methods return strings', () => {
    const config = loadConfig({
      PARK_NAME: 'P',
      API_PORT: '1',
      LOG_LEVEL: 'debug',
    });
    const log = createLogger(config);
    expect(typeof log.debug('d')).toBe('string');
    expect(typeof log.info('i')).toBe('string');
    expect(typeof log.warn('w')).toBe('string');
    expect(typeof log.error('e')).toBe('string');
  });
});
