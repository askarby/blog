import { UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';

export const createUrlSegments = (url: string): UrlSegment[] =>
  url.split('/').map((segment) => new UrlSegment(segment, {}));

export const createUrlTree = (url: string): UrlTree => {
  const tree = new UrlTree();
  tree.root = new UrlSegmentGroup(createUrlSegments(url), {});
  return tree;
};
