import {
  ActivatedRouteSnapshot,
  RoutesRecognized,
  UrlSegment,
  UrlSegmentGroup,
  UrlTree,
} from '@angular/router';

export const createUrlSegments = (url: string): UrlSegment[] =>
  url.split('/').map((segment) => new UrlSegment(segment, {}));

export const createUrlTree = (url: string): UrlTree => {
  const tree = new UrlTree();
  tree.root = new UrlSegmentGroup(createUrlSegments(url), {});
  return tree;
};

export const createRouteRecognizedEvent = (
  url: string,
  data: { [segment: string]: any[] }
): RoutesRecognized => {
  const activatedSnapshot = createActivatedRouteSnapshot(url, data);
  const snapshot = {
    firstChild: activatedSnapshot,
  } as any;
  return new RoutesRecognized(0, url, url, snapshot);
};

export const createActivatedRouteSnapshot = (
  url: string,
  data: { [segment: string]: any[] }
): ActivatedRouteSnapshot => {
  if (url.startsWith('/')) {
    return createActivatedRouteSnapshot(url.substring(1), data);
  }

  const snapshot = new ActivatedRouteSnapshot();

  let segment;
  if (url.includes('/')) {
    const firstSlashIndex = url.indexOf('/');
    segment = url.substring(0, firstSlashIndex);

    const child = createActivatedRouteSnapshot(
      url.substring(firstSlashIndex + 1),
      data
    );
    if (child) {
      jest.spyOn(snapshot, 'firstChild', 'get').mockReturnValue(child);
    }
  } else {
    segment = url;
  }

  const segmentData = data[segment];
  snapshot.data = {
    [segment]: segmentData,
  };

  return snapshot;
};
