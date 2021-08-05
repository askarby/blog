/**
 * Importance of cookies.
 *
 * This impacts on:
 * - The ordering of the cookies
 * - If the cookie can be disabled (or not) - see `CookieImportance#DEFAULT`
 */
export enum CookieImportance {
  /**
   * Default cookie settings, which can <b>not</b> be disabled
   */
  default = 0,
  primary = 100,
  secondary = 1000,
  tertiary = 10000,
}

/**
 * Information about the presence of a cookie for a given library / feature.
 */
export interface CookieProvider {
  /**
   * Id of provided cookies, which must be unique.
   */
  id: string;
  importance: CookieImportance;
  name: string;
  description: string;
}
