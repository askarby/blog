import { RouteTypes, ScullyConfig } from '@scullyio/scully';

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'blog',
  outDir: './dist/static',
  routes: {
    '/blog/post/:slug': {
      type: RouteTypes.contentFolder,
      slug: {
        folder: './blog',
      },
    },
  },
};
