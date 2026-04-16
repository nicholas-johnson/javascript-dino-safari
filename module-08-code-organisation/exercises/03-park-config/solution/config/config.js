import { AppError } from '../errors/index.js';

const VALID_LOG_LEVELS = new Set(['debug', 'info', 'warn', 'error']);

function parsePositiveIntegerPort(portStr) {
  const n = Number(portStr);
  if (!Number.isInteger(n) || n <= 0) {
    return null;
  }
  return n;
}

/**
 * @param {Record<string, string | undefined>} env
 * @returns {{ parkName: string; apiPort: number; logLevel: string }}
 */
export function loadConfig(env) {
  const parkRaw = env.PARK_NAME;
  if (
    parkRaw === undefined ||
    parkRaw === null ||
    String(parkRaw).trim() === ''
  ) {
    throw new AppError('CONFIG_MISSING', 'PARK_NAME is required');
  }
  const parkName = String(parkRaw).trim();

  const portRaw = env.API_PORT;
  const portStr =
    portRaw === undefined || portRaw === null || String(portRaw).trim() === ''
      ? '8080'
      : String(portRaw).trim();
  const apiPort = parsePositiveIntegerPort(portStr);
  if (apiPort === null) {
    throw new AppError('CONFIG_INVALID', 'API_PORT must be a positive integer');
  }

  const levelRaw = env.LOG_LEVEL;
  const logLevel =
    levelRaw === undefined || levelRaw === null || String(levelRaw).trim() === ''
      ? 'info'
      : String(levelRaw).trim();
  if (!VALID_LOG_LEVELS.has(logLevel)) {
    throw new AppError(
      'CONFIG_INVALID',
      'LOG_LEVEL must be debug, info, warn, or error',
    );
  }

  return { parkName, apiPort, logLevel };
}
