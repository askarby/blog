/**
 * Item that contains licensing details for "an item", where that can be:
 *
 * - an image
 * - a video
 * - code-snippet
 */
export interface LicenseItem {
  /**
   * Word / expression that covers what the item (that the license covers) is for, eg.:
   * "header image", "article image"  et. al.
   */
  forItem: string;

  /**
   * Name of site where item was acquired from (that's not the URL).
   */
  from: string;

  /**
   * Link to where item was acquired from.
   *
   * This must be the absolut URL to the item itself, and not just to the provider of the item
   * that has been licensed (read: don't simply refer to "https://pixabay.com"!)
   */
  url: string;

  /**
   * The type of license of for the item.
   *
   * Could be any of the standard licenses, such as BSD, GPL, LGPL etc., or
   * it could be the name of the company providing the license (eg. "Pixabay").
   *
   * Can be omitted if "from" indicates a known item provider (such as "Pixabay" et. al.)
   */
  licenseType?: string;

  /**
   * An URL to the license description
   *
   * Can be omitted for standard licenses, such as: BSD, GPL, LGPL, Pixabay etc.
   */
  licenseUrl?: string;
}
