/**
 * Item that contains licensing details for "an item", where that can be:
 *
 * - a blog
 * - a github repository
 * - a YouTube video
 */
export interface Reference {
  /**
   * Name of site / user where the reference was acquired from (that's not the URL).
   */
  name: string;

  /**
   * Link to where reference was acquired from.
   *
   * This must be the absolute URL to the item itself, and not just to the provider of the item
   * that has been licensed (read: don't simply refer to "https://some-blog.com"!)
   */
  url: string;
}
