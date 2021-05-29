import {
  getPluginConfig,
  HandledRoute,
  registerPlugin,
} from '@scullyio/scully';

import sharp, { OutputInfo, ResizeOptions } from 'sharp';
import * as path from 'path';
import { constants, promises as fs } from 'fs';

export const routeThumbnail = 'routeThumbnail';

export interface RouteThumbnailOptions {
  /**
   * The path of the entries to generate thumbnails for.
   */
  path: string;

  /**
   * The property of the to read the image from.
   *
   * This is the property that the thumbnail is generated from.
   */
  imageProperty: string;

  /**
   * Configuration of the thumbnail that's being produced.
   */
  output: {
    /**
     * The desired width of the thumbnail.
     *
     * This can be omitted, and in case of that, the height will be
     * the determining size factor
     */
    width?: number;
    height?: number;
  };
}

export const routeThumbnailFunc = async (
  routes: HandledRoute[]
): Promise<HandledRoute[]> => {
  const options: RouteThumbnailOptions = getPluginConfig(routeThumbnail);

  const enhanced: HandledRoute[] = [];
  for (const route of routes) {
    if (
      route.data[options.imageProperty] &&
      route.route.startsWith(options.path)
    ) {
      enhanced.push(await enhanceWithThumbnail(route, options));
    } else {
      enhanced.push(route);
    }
  }
  return enhanced;
};

const enhanceWithThumbnail = async (
  route: HandledRoute,
  options: RouteThumbnailOptions
): Promise<HandledRoute> => {
  const markdownFilePath = route.templateFile;
  const imageEntry = route.data[options.imageProperty];
  const {
    absoluteInputPath,
    absoluteOutputPath,
    thumbnailEntry,
  } = await getThumbnailPaths(markdownFilePath, imageEntry);
  await createThumbnail(absoluteInputPath, absoluteOutputPath, options);

  return {
    ...route,
    data: {
      ...route.data,
      thumbnail: thumbnailEntry,
    },
  };
};

const getThumbnailPaths = async (
  markdownFilePath: string,
  imageEntry: string
): Promise<{
  absoluteInputPath: string;
  absoluteOutputPath: string;
  thumbnailEntry: string;
}> => {
  const patternFile = /(.*)(\d{4})\/(.*\..*)/;
  const patternImage = /(\d{4})\/(.*)\.(jpg|jpeg|gif|png)/i;

  const [, root, markdownYear] = patternFile.exec(markdownFilePath);
  const [, imageYear, imageBasename, imageExtension] = patternImage.exec(
    imageEntry
  );

  if (markdownYear !== imageYear) {
    throw new Error(
      `Cannot place image in folder "${imageYear}", when post originates from "${markdownYear}"`
    );
  }

  const absoluteInputPath = path.join(root, imageEntry);
  try {
    // eslint-disable-next-line no-bitwise
    await fs.access(absoluteInputPath, constants.F_OK | constants.R_OK);
  } catch {
    throw new Error(`Cannot read from input file "${absoluteInputPath}"`);
  }

  const thumbnailFilename = `${imageBasename}.thumbnail.${imageExtension}`;
  const thumbnailEntry = path.join(imageYear, thumbnailFilename);
  const thumbnailDestinationFolder = path.join(root, imageYear);
  const absoluteOutputPath = path.join(root, thumbnailEntry);
  try {
    await fs.access(thumbnailDestinationFolder, constants.W_OK);
  } catch {
    throw new Error(`Cannot write to output file "${absoluteOutputPath}"`);
  }

  return {
    absoluteInputPath,
    absoluteOutputPath,
    thumbnailEntry,
  };
};

const createThumbnail = async (
  inputPath: string,
  outputPath: string,
  options: RouteThumbnailOptions
): Promise<OutputInfo> => {
  const resizeTo: ResizeOptions = {};
  if (options.output.width) {
    resizeTo.width = options.output.width;
  }
  if (options.output.height) {
    resizeTo.height = options.output.height;
  }
  return await sharp(inputPath).resize(resizeTo).toFile(outputPath);
};

/**
 * Provides a plug-in that adds thumbnail generation, based on the "image"-property
 * in the Front-matter of the markdown files.
 *
 * The thumbnails are generated using "Sharp" (https://sharp.pixelplumbing.com/)
 */
registerPlugin('routeProcess', routeThumbnail, routeThumbnailFunc);
