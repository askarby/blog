import { Post } from '../../models/post.model';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { GroupedPosts } from '../../models/grouped-posts.model';
import { Month } from '../../models/month.model';

export interface GroupPostsConfiguration {
  splitAt: number;
}

export const groupPosts = (
  config: GroupPostsConfiguration = { splitAt: 5 }
): OperatorFunction<Post[], GroupedPosts[]> => (input: Observable<Post[]>) =>
  input.pipe(
    map(sortPosts),
    map((posts) => createGroupedPosts(posts, config.splitAt))
  );

const sortPosts = (posts: Post[]): Post[] =>
  [...posts].sort(
    (a, b) => b.published_date.getTime() - a.published_date.getTime()
  );

const createGroupedPosts = (
  posts: Post[],
  splitAtPosts: number
): GroupedPosts[] => {
  if (posts.length === 0) {
    return [];
  }
  const raw = group(posts);
  const grouped: GroupedPosts[] = [];
  Object.keys(raw)
    .map(Number)
    .sort((a, b) => b - a)
    .forEach((year) => {
      const byMonth = raw[year];
      const groupByMonths = Object.values(byMonth)
        .map((each) => each.length)
        .some((count) => count > splitAtPosts);
      if (groupByMonths) {
        const subgroups = Object.keys(byMonth)
          .map(Number)
          .sort((a, b) => b - a)
          .map((month) => ({ month, posts: byMonth[month] }))
          .map((entry) => ({
            month: entry.month as Month,
            posts: entry.posts,
          }));
        grouped.push({
          type: 'by-year-and-month',
          year,
          subgroups,
        });
      } else {
        grouped.push({
          type: 'by-year',
          year,
          posts: Object.keys(byMonth)
            .map(Number)
            .sort((a, b) => b - a)
            .map((month) => byMonth[month])
            .flat(),
        });
      }
    });
  return grouped;
};

type Grouped = { [year: number]: { [month: number]: Post[] } };
const group = (posts: Post[]): Grouped => {
  const byYearAndMonth: Grouped = {};
  posts.forEach((post) => {
    const year = post.published_date.getFullYear();
    const month = post.published_date.getMonth();

    let byYear = byYearAndMonth[year];
    if (!byYear) {
      byYear = {};
      byYearAndMonth[year] = byYear;
    }
    let byMonth = byYear[month];
    if (!byMonth) {
      byMonth = [];
      byYear[month] = byMonth;
    }
    byMonth.push(post);
  });
  return byYearAndMonth;
};
