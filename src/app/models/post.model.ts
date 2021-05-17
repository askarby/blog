/* eslint-disable @typescript-eslint/naming-convention */
import { ScullyRoute } from '@scullyio/ng-lib';
import { LicenseItem } from './license-info.model';

export interface TocEntry {
  /**
   * Id of heading element, can be used anchor-references.
   */
  id: string;

  /**
   * Text of heading.
   */
  text: string;

  /**
   * Corresponds to heading level, eg.:
   *
   * - `h1` (or `#` in markdown) get translated to 1
   * - `h2` (or `##` in markdown) get translated to 2
   * - `h3` (or `###` in markdown) get translated to 3
   * - etc.
   */
  level: number;
}

export interface Post extends ScullyRoute {
  /**
   * Title of post.
   *
   * (this is indeed specified in `ScullyRoute`, albeit optional, where we consider it required)
   */
  title: string;

  /**
   * Short description of the post (summary).
   */
  description: string;

  /**
   * Image of post.
   */
  image: string;

  /**
   * The date the post was published.
   */
  published_date: Date;

  /**
   * Tags applied to post.
   */
  tags: string[];

  /**
   * Legacy URL, to keep SEO scoring from previous blog.
   *
   * (absent if it's a post written after having changed from jekyll to scully)
   */
  legacy_url?: string;

  /**
   * Table of contents for post.
   *
   * (absent if having no headings)
   */
  toc?: TocEntry[];

  /**
   * Licenses that can be applied to the contents of the post.
   *
   * (when absent, this will produce an empty array of `LicenseItem`s).
   */
  licenses: LicenseItem[];
}
