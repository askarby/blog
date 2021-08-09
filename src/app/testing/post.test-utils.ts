/* eslint-disable @typescript-eslint/naming-convention */
import { Post, TocEntry } from '../models/post.model';
import { ScullyRoute } from '@scullyio/ng-lib';
import { dateOfYear, getMonthIndex, getNameOfMonth } from './date.test-utils';
import { createLicenseItem } from './license.test-util';
import { createReferenceItem } from './reference.test-utils';

export const createPost = (seed: Partial<Post> = {}): Post => ({
  route: '/blog/2021/2021-04-10-how-to-write-a-good-blog-post',
  title: 'How-to write a good blog post',
  description: 'Post about writing a good blog post',
  slugs: ['slug-a', 'slug-b', 'slug-c'],
  published: true,
  slug: 'slug',
  sourceFile: '/blog/2021/2021-04-10-how-to-write-a-good-blog-post.md',
  lang: 'en',
  image: '/assets/2021/write.jpg',
  thumbnail: '/assets/2021/write.thumbnail.jpg',
  tags: ['writing', 'blogging'],
  published_date: new Date(Date.parse('2021-04-10T00:00:00.000Z')),
  toc: createTableOfContents(),
  licenses: [createLicenseItem()],
  references: [createReferenceItem()],
  readingTime: 42,
  ...seed,
});

export const createPostAsScullyRoute = (
  seed: Partial<Post> = {}
): ScullyRoute => {
  const post = createPost(seed);
  return {
    ...post,
    tags: post.tags.join(' '),
    published_date: post.published_date.toISOString(),
  };
};

export const createTableOfContents = (): TocEntry[] => [
  { id: 'introduction', level: 2, text: 'Introduction' },
  { id: 'wash-your-car', level: 2, text: 'Wash your card' },
  { id: 'apply-soap', level: 3, text: 'Apply soap' },
  {
    id: 'rinse-of-soap-with-water',
    level: 3,
    text: 'Rinse of soap with water',
  },
  { id: 'dry-with-leaf-blower', level: 3, text: 'Dry with leaf blower' },
  { id: 'introduction', level: 2, text: 'Introduction' },
];

export const addCopiesWithYears = (posts: Post[], ...years: number[]): Post[] =>
  posts
    .map((post) => [
      post,
      ...years.map((year) => {
        const offsetDate = new Date(post.published_date.getTime());
        offsetDate.setFullYear(year);

        return {
          ...post,
          title: post.title?.replace(
            post.published_date.getFullYear().toString(),
            year.toString()
          ),
          published_date: offsetDate,
        };
      }),
    ])
    .flat(2);

export const createPosts = (config: {
  year: number;
  monthName: string;
  noOfPosts: number;
}): Post[] => {
  // Assert that we don't create a range of posts that exceeds the number of days in the month
  const monthNo = getMonthIndex(config.monthName);
  const lastDayOfMonth = new Date(2008, monthNo + 1, 0).getDate();
  if (config.noOfPosts > lastDayOfMonth) {
    throw new Error(
      `Unable to create ${config.noOfPosts} Posts for ${getNameOfMonth(
        monthNo
      )} (${
        config.year
      }) - a maximum of 1 Post per day is allowed (max is ${lastDayOfMonth})`
    );
  }

  // Create range of posts
  return Array(config.noOfPosts)
    .fill(0)
    .map((_, index) => {
      const dayOfMonth = index + 1;
      const publishedDate = dateOfYear(config.year)
        .withMonth(config.monthName)
        .withDay(dayOfMonth)
        .withoutTime();

      const paddedMonth = Number(monthNo + 1)
        .toString()
        .padStart(2, '0');
      const paddedDay = Number(dayOfMonth).toString().padStart(2, '0');

      return createPost({
        route: `/blog/${config.year}/${config.year}-${paddedMonth}-${paddedDay}-some-blog-post`,
        title: `Some blog post @ ${publishedDate.toString('date')}`,
        published_date: publishedDate.build(),
      });
    });
};
