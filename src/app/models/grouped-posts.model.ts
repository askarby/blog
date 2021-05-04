import { Post } from './post.model';
import { Month } from './month.model';

export interface GroupedPostsByYear {
  type: 'by-year';
  year: number;
  posts: Post[];
}

export interface GroupedPostsByYearAndMonth {
  type: 'by-year-and-month';
  year: number;
  subgroups: GroupedPostsByMonth[];
}

export interface GroupedPostsByMonth {
  month: Month;
  posts: Post[];
}

export type GroupedPosts = GroupedPostsByYear | GroupedPostsByYearAndMonth;
