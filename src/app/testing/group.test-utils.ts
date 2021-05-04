import {
  GroupedPostsByMonth,
  GroupedPostsByYear,
  GroupedPostsByYearAndMonth,
} from '../models/grouped-posts.model';
import { createPosts } from './post.test-utils';
import { getMonthIndex } from './date.test-utils';

type PostDistribution = {
  [month in
    | 'jan'
    | 'feb'
    | 'mar'
    | 'apr'
    | 'may'
    | 'jun'
    | 'jul'
    | 'aug'
    | 'sep'
    | 'oct'
    | 'nov'
    | 'dec']: number;
};

interface GroupedPostsTestConfig {
  year: number;
  distribution: Partial<PostDistribution>;
}

const createGroupedPostsByMonth = (
  year: number,
  monthName: string,
  noOfPosts: number
): GroupedPostsByMonth => ({
  month: getMonthIndex(monthName),
  posts: createPosts({
    monthName,
    noOfPosts,
    year,
  }),
});

export const createGroupedPostsByYearAndMonth = (
  config: GroupedPostsTestConfig
): GroupedPostsByYearAndMonth => {
  const year = config.year;
  const noOfPostsByMonth = config.distribution;
  const subgroups = Object.entries(noOfPostsByMonth).map(([month, noOfPosts]) =>
    createGroupedPostsByMonth(year, month, Number(noOfPosts))
  );
  return {
    type: 'by-year-and-month',
    year,
    subgroups,
  };
};

export const createGroupedPostsByYear = (
  config: GroupedPostsTestConfig
): GroupedPostsByYear => {
  const year = config.year;
  const noOfPostsByMonth = config.distribution;
  const posts = Object.entries(noOfPostsByMonth)
    .map(([month, noOfPosts]) =>
      createGroupedPostsByMonth(year, month, Number(noOfPosts))
    )
    .map((group) => group.posts)
    .flat();
  return {
    type: 'by-year',
    year,
    posts,
  };
};
