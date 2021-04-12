/* eslint-disable @typescript-eslint/naming-convention */
import { ScullyRoute } from '@scullyio/ng-lib';

export interface Post extends ScullyRoute {
  image: string;
  tags: string[];
  published_date: Date;
  legacy_url?: string;
}
