/**
 * LoggerService - Centralized logging for the application.
 * Supports structured logs with context and levels.
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

// Default level (could be injected via env in a real setup)
const CURRENT_LOG_LEVEL = 1; 

class LoggerService {
  /**
   * Send log to external provider (stub for Day 10)
   * In a real app, this would send to Google Analytics, Sentry, or a custom backend.
   */
  static _dispatch(level, message, context = {}) {
    if (level < CURRENT_LOG_LEVEL) return;

    const entry = {
      timestamp: new Date().toISOString(),
      level: Object.keys(LOG_LEVELS).find(key => LOG_LEVELS[key] === level),
      message,
      context,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server'
    };

    // Log to console for now
    if (level >= LOG_LEVELS.ERROR) {
      console.error(`[${entry.level}] ${message}`, context);
    } else if (level === LOG_LEVELS.WARN) {
      console.warn(`[${entry.level}] ${message}`, context);
    } else {
      console.log(`[${entry.level}] ${message}`, context);
    }

    // Day 13: Hybrid Vanguard Resilient Logging (Non-blocking Edge log)
    if (level >= LOG_LEVELS.INFO && typeof window !== 'undefined') {
        const isCritical = level >= LOG_LEVELS.WARN;
        const logData = { ...entry, source: 'vanguard-client' };
        
        // Use background fetch or beacon for logging
        if (navigator.sendBeacon && isCritical) {
            navigator.sendBeacon('/api/log', JSON.stringify(logData));
        }
    }
  }

  static debug(message, context) { this._dispatch(LOG_LEVELS.DEBUG, message, context); }
  static info(message, context) { this._dispatch(LOG_LEVELS.INFO, message, context); }
  static warn(message, context) { this._dispatch(LOG_LEVELS.WARN, message, context); }
  static error(message, context) { this._dispatch(LOG_LEVELS.ERROR, message, context); }
}

export default LoggerService;
