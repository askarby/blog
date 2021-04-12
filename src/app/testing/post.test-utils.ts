/* eslint-disable @typescript-eslint/naming-convention */
import { Post } from '../models/post.model';
import { ScullyRoute } from '@scullyio/ng-lib';

export const createPost = (seed: Partial<Post> = {}): Post => ({
  route: '/blog/2021/2021-04-10-how-to-write-a-good-blog-post',
  title: 'How-to write a good blog post',
  slugs: ['slug-a', 'slug-b', 'slug-c'],
  published: true,
  slug: 'slug',
  sourceFile: '/blog/2021/2021-04-10-how-to-write-a-good-blog-post.md',
  lang: 'en',
  image: '/assets/2021/write.jpg',
  tags: ['writing', 'blogging'],
  published_date: new Date(Date.parse('2021-04-10T00:00:00.000Z')),
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
