/**
 * Simple in-memory cache with TTL (Time To Live)
 * Reduces database reads by caching API responses
 */

class Cache {
  constructor() {
    this.cache = new Map();
  }

  /**
   * Get value from cache
   * @param {string} key - Cache key
   * @returns {any|null} - Cached value or null if expired/not found
   */
  get(key) {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Check if cache has expired
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    console.log(`Cache HIT for key: ${key}`);
    return item.value;
  }

  /**
   * Set value in cache with TTL
   * @param {string} key - Cache key
   * @param {any} value - Value to cache
   * @param {number} ttl - Time to live in milliseconds (default: 5 minutes)
   */
  set(key, value, ttl = 5 * 60 * 1000) {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { value, expiry });
    console.log(`Cache SET for key: ${key} (TTL: ${ttl / 1000}s)`);
  }

  /**
   * Check if key exists and is not expired
   * @param {string} key - Cache key
   * @returns {boolean}
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Remove specific key from cache
   * @param {string} key - Cache key
   */
  delete(key) {
    this.cache.delete(key);
    console.log(`Cache DELETED for key: ${key}`);
  }

  /**
   * Clear all cache
   */
  clear() {
    this.cache.clear();
    console.log('Cache CLEARED');
  }

  /**
   * Get cache statistics
   * @returns {object} - Cache stats
   */
  getStats() {
    let validEntries = 0;
    let expiredEntries = 0;
    
    this.cache.forEach((item) => {
      if (Date.now() > item.expiry) {
        expiredEntries++;
      } else {
        validEntries++;
      }
    });

    return {
      total: this.cache.size,
      valid: validEntries,
      expired: expiredEntries
    };
  }
}

// Export singleton instance
export const cache = new Cache();

// Cache TTL constants (in milliseconds)
export const CACHE_TTL = {
  SHORT: 2 * 60 * 1000,      // 2 minutes
  MEDIUM: 5 * 60 * 1000,     // 5 minutes
  LONG: 15 * 60 * 1000,      // 15 minutes
  EXTRA_LONG: 30 * 60 * 1000 // 30 minutes
};

export default cache;
