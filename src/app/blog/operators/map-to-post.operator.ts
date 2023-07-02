import { Post } from '../../models/post.model';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Observable, OperatorFunction, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';

const findSeriesPosts = (
  postDate: Date,
  seriesTitle: string,
  allRoutes: ScullyRoute[]
): { previous: Post | undefined; next: Post | undefined } => {
  const sortedInSeries = allRoutes
    .filter((route) => route.series === seriesTitle)
    .sort(
      (a, b) =>
        new Date(a.published_date).getTime() -
        new Date(b.published_date).getTime()
    );

  const currentPostIndex = sortedInSeries.findIndex(
    (route) => new Date(route.published_date).getTime() === postDate.getTime()
  );
  const previousPostIndex = currentPostIndex - 1;
  const nextPostIndex = currentPostIndex + 1;

  const previous =
    previousPostIndex >= 0 && previousPostIndex < currentPostIndex
      ? routeToPost(sortedInSeries[previousPostIndex], [], {
          includeSeries: false,
        })
      : undefined;
  const next =
    nextPostIndex < sortedInSeries.length && nextPostIndex > currentPostIndex
      ? routeToPost(sortedInSeries[nextPostIndex], [], { includeSeries: false })
      : undefined;
  return { previous, next };
};

const routeToPost = (
  route: ScullyRoute,
  allRoutes: ScullyRoute[],
  cfg = { includeSeries: true }
): Post => {
  const post = {} as Post;
  post.tags = [];
  post.licenses = [];
  post.references = [];

  Object.entries(route).forEach(([key, value]) => {
    if (key === 'tags') {
      post.tags = value.split(' ');
    } else if (key === 'published_date') {
      post.published_date = new Date(value);
    } else if (['image', 'thumbnail'].includes(key)) {
      post[key] = `/assets/${value}`;
    } else if (key === 'series' && cfg.includeSeries) {
      post.series = {
        title: value,
        ...findSeriesPosts(new Date(route.published_date), value, allRoutes),
      };

      if (!post.series?.next && !post.series?.previous) {
        delete post.series;
      }
    } else {
      post[key] = value;
    }
  });
  return post;
};

/**
 * Maps an `Observable` of a `ScullyRoute`-object to an Observable of `Post`-object.
 *
 * **Note:** This does not apply `series`-information to the `Post`-object, as this
 * requires a stream of all Posts to be available!
 */
export const mapToPost =
  (
    availableRoutes$: Observable<ScullyRoute[]>
  ): OperatorFunction<ScullyRoute, Post> =>
  (input: Observable<ScullyRoute>) =>
    input.pipe(
      withLatestFrom(availableRoutes$),
      map(([route, available]) => routeToPost(route, available))
    );

export const mapToPosts =
  (): OperatorFunction<ScullyRoute[], Post[]> =>
  (input: Observable<ScullyRoute[]>) =>
    input.pipe(
      map((routes) => routes.map((current) => routeToPost(current, routes)))
    );
