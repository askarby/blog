/**
 * Persisted settings for cookies.
 */
export interface PersistedCookieSettings {
  /**
   * Enablement of `CookieProvider`, organized by:
   * - `key` being id of `CookieProvider`
   * - `value` being the enablement state (`true` if enabled, `false` if other)
   *
   * @see CookieProvider
   */
  enablement: {
    [cookieId: string]: boolean;
  };
}
