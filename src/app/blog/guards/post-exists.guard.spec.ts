import {
  createServiceFactory,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator/jest';
import { PostExistsGuard } from './post-exists.guard';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { of } from 'rxjs';
import { hot } from 'jest-marbles';
import {
  createUrlSegments,
  createUrlTree,
} from '../../testing/routing.test-utils';
import { createPost } from '../../testing/post.test-utils';

describe('PostExistsGuard', () => {
  const createGuard = createServiceFactory({
    service: PostExistsGuard,
    mocks: [
      ScullyRoutesService,
      Router,
      ActivatedRouteSnapshot,
      RouterStateSnapshot,
    ],
  });

  let spectator: SpectatorService<PostExistsGuard>;
  let guard: PostExistsGuard;

  let scully: SpyObject<ScullyRoutesService>;
  let router: SpyObject<Router>;
  let route: SpyObject<ActivatedRouteSnapshot>;
  let state: SpyObject<RouterStateSnapshot>;

  beforeEach(() => {
    spectator = createGuard();
    guard = spectator.service;

    scully = spectator.inject(ScullyRoutesService);
    router = spectator.inject(Router);
    route = spectator.inject(ActivatedRouteSnapshot);
    state = spectator.inject(RouterStateSnapshot);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when post for url is found', () => {
    route.url = createUrlSegments('/blog/post/matching-url');

    scully.available$ = of([
      createPost({ route: '/blog/post/matching-url', title: 'matching' }),
      createPost({
        route: '/blog/post/non-matching-url',
        title: 'non-matching',
      }),
    ]);

    expect(guard.canActivate(route, state)).toBeObservable(
      hot('(a|)', { a: true })
    );
  });

  it('should redirect to "404 page", when post for url can\'t found', () => {
    router.parseUrl.mockImplementation((url) => createUrlTree(url));
    route.url = createUrlSegments('/blog/post/wont-match-anything-url');
    scully.available$ = of([
      createPost({
        route: '/blog/post/non-matching-url',
        title: 'non-matching',
      }),
      createPost({
        route: '/blog/post/another-non-matching-url',
        title: 'another-non-matching',
      }),
    ]);

    expect(guard.canActivate(route, state)).toBeObservable(
      hot('(a|)', { a: createUrlTree('/not-found') })
    );
  });
});
