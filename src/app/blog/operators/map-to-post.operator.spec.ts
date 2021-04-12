import { ScullyRoute } from '@scullyio/ng-lib';
import { createPostAsScullyRoute } from '../../testing/post.test-utils';
import { of } from 'rxjs';
import { mapToPost } from './map-to-post.operator';

describe('mapToPost operator', () => {
  let route: ScullyRoute;

  beforeEach(() => {
    route = createPostAsScullyRoute({
      tags: ['a', 'b', 'c'],
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
});
