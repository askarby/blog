import { getMyConfig, HandledRoute, registerPlugin } from '@scullyio/scully';
import * as fs from 'fs';

export const routeToc = 'routeToc';

export interface RouteTocOptions {
  path: string;
  levels: string[];
}

export const routeTocFunc = async (routes: HandledRoute[]) => {
  const options: RouteTocOptions = getMyConfig(routeToc);
  console.log('found options >>\n', JSON.stringify(options, null, 2));
  return routes
    .filter((route) => route.templateFile)
    .map((route) => {
      if (route.route.startsWith(options.path)) {
        const content = fs.readFileSync(route.templateFile).toString('utf-8');
        console.log(content);
        // TODO: Add headings for toc-rendering of Angular App, eg.:
        // toc: [
        //   { id: '...', text: '...', level: 'h1' },
        //   { id: '...', text: '...', level: 'h2' },
        //   { id: '...', text: '...', level: 'h2' },
        //   ...
        // ]
        const newRoute = {
          ...route,
          data: {
            ...route.data,
            bob: true,
          },
        };
        return newRoute;
      }
      return route;
    });
};
console.log(`Registering ${routeToc} plugin, with function: ${routeTocFunc}!`);
registerPlugin('routeProcess', routeToc, routeTocFunc);
