import {
  getPluginConfig,
  HandledRoute,
  registerPlugin,
} from '@scullyio/scully';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

export const routeToc = 'routeToc';

export interface RouteTocOptions {
  path: string;
  levels: string[];
}

export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

export const routeTocFunc = async (
  routes: HandledRoute[]
): Promise<HandledRoute[]> => {
  const options: RouteTocOptions = getPluginConfig(routeToc);

  const enhanced: HandledRoute[] = [];
  for (const route of routes) {
    if (route.templateFile && route.route.startsWith(options.path)) {
      enhanced.push(await enhanceWithToc(route));
    }
  }
  return enhanced;
};

const enhanceWithToc = async (route: HandledRoute): Promise<HandledRoute> => {
  const headings = await readHeadings(route.templateFile);
  if (headings.length === 0) {
    return route;
  }

  return {
    ...route,
    data: {
      ...route.data,
      toc: headings.map((raw): TocEntry => {
        const [, level, text] = raw.trim().match(/(#+)\s+(.*)/);
        return {
          id: getIdFromHeading(text),
          text: getTextFromHeading(text),
          level: level.length,
        };
      }),
    },
  };
};

const getTextFromHeading = (heading: string): string =>
  heading
    .split('')
    .filter((letter) => !['`', '*', '_'].includes(letter))
    .join('');

const getIdFromHeading = (heading: string): string =>
  heading
    .split('')
    .map((letter) => {
      if (letter.match(/[a-zæøå0-9\-]/i)) {
        return letter.toLocaleLowerCase();
      } else if (letter.match(/\s/)) {
        return '-';
      } else {
        return '';
      }
    })
    .join('');

const readHeadings = async (pathToMarkdownFile: string): Promise<string[]> => {
  const readInterface = createInterface({
    input: createReadStream(pathToMarkdownFile),
    terminal: false,
  });
  return new Promise((resolve) => {
    const headlines = [];
    let insideCodeSnippet = false;
    readInterface.on('line', (line) => {
      if (line.startsWith('```')) {
        insideCodeSnippet = !insideCodeSnippet;
      }
      if (line.startsWith('#') && !insideCodeSnippet) {
        headlines.push(line);
      }
    });
    readInterface.on('close', () => {
      resolve(headlines);
    });
  });
};

registerPlugin('routeProcess', routeToc, routeTocFunc);
