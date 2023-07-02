import { ScullyRoute } from '@scullyio/ng-lib';
import { createPostAsScullyRoute } from '../../testing/post.test-utils';
import { of } from 'rxjs';
import { mapToPost } from './map-to-post.operator';
import { dateOfYear } from '../../testing/date.test-utils';

describe('mapToPost operator', () => {
  let route: ScullyRoute;
  let publishedAt: Date;

  beforeEach(() => {
    publishedAt = dateOfYear(2021)
      .withMonth('apr')
      .withDay(25)
      .withTime('12:34:56')
      .build();

    route = createPostAsScullyRoute({
      tags: ['a', 'b', 'c'],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      published_date: publishedAt,
      image: '2011/some-image.jpg',
      thumbnail: '2011/some-image.thumbnail.jpg',
    });
  });

  it('should map tags to an array', (done) => {
    of(route)
      .pipe(mapToPost(of([route])))
      .subscribe((post) => {
        expect(post.tags).toEqual(['a', 'b', 'c']);
        done();
      });
  });

  it('should map published_date to an Date', (done) => {
    of(route)
      .pipe(mapToPost(of([route])))
      .subscribe((post) => {
        expect(post.published_date).toEqual(publishedAt);
        done();
      });
  });

  ['image', 'thumbnail'].forEach((assetKey) => {
    it(`should map ${assetKey} to be prefixed with "assets"`, (done) => {
      of(route)
        .pipe(mapToPost(of([route])))
        .subscribe((post) => {
          expect(post[assetKey]).toStartWith(`/assets/`);
          done();
        });
    });
  });

  ['tags', 'licenses', 'references'].forEach((assetKey) => {
    it(`should return an empty list of ${assetKey}, if none are present in route`, (done) => {
      delete route[assetKey];
      of(route)
        .pipe(mapToPost(of([route])))
        .subscribe((post) => {
          expect(post[assetKey]).toEqual([]);
          done();
        });
    });
  });

  describe('"series"-property', () => {
    let previousRoute: ScullyRoute;
    let nextRoute: ScullyRoute;

    let previousPublishedAt: Date;
    let nextPublishedAt: Date;

    beforeEach(() => {
      route = createPostAsScullyRoute({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        published_date: publishedAt,
        series: 'Series' as any,
      });

      previousPublishedAt = dateOfYear(2021)
        .withMonth('mar')
        .withDay(25)
        .withTime('12:34:56')
        .build();
      previousRoute = createPostAsScullyRoute({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        published_date: previousPublishedAt,
        title: 'Previous post',
        series: 'Series' as any,
      });

      nextPublishedAt = dateOfYear(2021)
        .withMonth('may')
        .withDay(25)
        .withTime('12:34:56')
        .build();
      nextRoute = createPostAsScullyRoute({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        published_date: nextPublishedAt,
        title: 'Next post',
        series: 'Series' as any,
      });
    });

    it('should add series to post, if route is part of a series', (done) => {
      const available$ = of([route, previousRoute, nextRoute]);

      of(route)
        .pipe(mapToPost(available$))
        .subscribe((post) => {
          expect(post.series?.title).toEqual('Series');
          expect(post.series?.next?.published_date).toEqual(nextPublishedAt);
          expect(post.series?.previous?.published_date).toEqual(
            previousPublishedAt
          );
          done();
        });
    });

    it('should add series to post, with title and next post (when no previous post is available)', (done) => {
      const available$ = of([route, nextRoute]);

      of(route)
        .pipe(mapToPost(available$))
        .subscribe((post) => {
          expect(post.series?.title).toEqual('Series');
          expect(post.series?.next?.published_date).toEqual(nextPublishedAt);
          expect(post.series?.previous).toBeUndefined();
          done();
        });
    });

    it('should add series to post, with title and previous post (when no next post is available)', (done) => {
      const available$ = of([route, previousRoute]);

      of(route)
        .pipe(mapToPost(available$))
        .subscribe((post) => {
          expect(post.series?.title).toEqual('Series');
          expect(post.series?.next).toBeUndefined();
          expect(post.series?.previous?.published_date).toEqual(
            previousPublishedAt
          );
          done();
        });
    });

    it('should not add series to post, if unable to find next or previous post', (done) => {
      const available$ = of([route]);

      of(route)
        .pipe(mapToPost(available$))
        .subscribe((post) => {
          expect(post.series).toBeUndefined();
          done();
        });
    });
  });
});
