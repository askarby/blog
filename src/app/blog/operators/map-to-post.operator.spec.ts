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
    });
  });

  it('should map tags to an array', (done) => {
    of(route)
      .pipe(mapToPost())
      .subscribe((post) => {
        expect(post.tags).toEqual(['a', 'b', 'c']);
        done();
      });
  });

  it('should map published_date to an Date', (done) => {
    of(route)
      .pipe(mapToPost())
      .subscribe((post) => {
        expect(post.published_date).toEqual(publishedAt);
        done();
      });
  });

  it('should map image to be prefixed with "assets"', (done) => {
    of(route)
      .pipe(mapToPost())
      .subscribe((post) => {
        expect(post.image).toEqual(`/assets/2011/some-image.jpg`);
        done();
      });
  });
});
