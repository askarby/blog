import { ScullyRoute } from '@scullyio/ng-lib';

export const createPost = (seed: Partial<ScullyRoute> = {}): ScullyRoute => ({
  route: '/blog/2021/2021-04-10-how-to-write-a-good-blog-post',
  title: 'How-to write a good blog post',
  slugs: ['slug-a', 'slug-b', 'slug-c'],
  published: true,
  slug: 'slug',
  sourceFile: '/blog/2021/2021-04-10-how-to-write-a-good-blog-post.md',
  lang: 'en',
  ...seed,
});
