const LEVEL_ORDER = { debug: 0, info: 1, warn: 2, error: 3 };

function formatMeta(meta) {
  if (meta == null || typeof meta !== 'object') {
    return '';
  }
  const keys = Object.keys(meta);
  if (keys.length === 0) {
    return '';
  }
  const parts = keys.sort().map((key) => `${key}=${meta[key]}`);
  return ` | ${parts.join(' ')}`;
}

function shouldEmit(methodLevel, configuredLevel) {
  return LEVEL_ORDER[methodLevel] >= LEVEL_ORDER[configuredLevel];
}

function logLine(level, config, msg, meta) {
  const levelLabel = level.toUpperCase();
  const suffix = formatMeta(meta);
  return `[${levelLabel}] [${config.parkName}] ${msg}${suffix}`;
}

/**
 * @param {{ parkName: string; apiPort: number; logLevel: string }} config
 */
export function createLogger(config) {
  return {
    debug(msg, meta) {
      if (!shouldEmit('debug', config.logLevel)) {
        return null;
      }
      const line = logLine('debug', config, msg, meta);
      console.log(line);
      return line;
    },
    info(msg, meta) {
      if (!shouldEmit('info', config.logLevel)) {
        return null;
      }
      const line = logLine('info', config, msg, meta);
      console.log(line);
      return line;
    },
    warn(msg, meta) {
      if (!shouldEmit('warn', config.logLevel)) {
        return null;
      }
      const line = logLine('warn', config, msg, meta);
      console.log(line);
      return line;
    },
    error(msg, meta) {
      if (!shouldEmit('error', config.logLevel)) {
        return null;
      }
      const line = logLine('error', config, msg, meta);
      console.log(line);
      return line;
    },
  };
}
