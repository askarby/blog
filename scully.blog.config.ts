import { RouteTypes, ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { timeToRead, timeToReadOptions } from 'scully-plugin-time-to-read';
import { routeToc, RouteTocOptions } from './scully/plugins/route-toc-plugin';
import {
  routeThumbnail,
  RouteThumbnailOptions,
} from './scully/plugins/route-thumbnail-plugin';

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

setPluginConfig(timeToRead, {
  path: '/blog/post',
} as timeToReadOptions);

setPluginConfig(routeToc, {
  path: '/blog/post',
} as RouteTocOptions);

setPluginConfig(routeThumbnail, {
  path: '/blog/post',
  imageProperty: 'image',
  output: {
    width: 150,
  },
} as RouteThumbnailOptions);
