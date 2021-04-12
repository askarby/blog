import {
  createServiceFactory,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator/jest';
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
} from '../testing/routing.test-utils';
import { createPost } from '../testing/post.test-utils';
import { LegacyUrlLookupGuard } from './legacy-url-lookup.guard';

describe('LegacyUrlLookupGuard', () => {
  const createGuard = createServiceFactory({
    service: LegacyUrlLookupGuard,
    mocks: [
      ScullyRoutesService,
      Router,
      ActivatedRouteSnapshot,
      RouterStateSnapshot,
    ],
  });

  let spectator: SpectatorService<LegacyUrlLookupGuard>;
  let guard: LegacyUrlLookupGuard;

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

  it('should allow access when post for legacy url is not found', () => {
    route.url = createUrlSegments('/legacy-url');

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
      hot('(a|)', { a: true })
    );
  });

  it('should redirect to "post url", when post for legacy url is found', () => {
    router.parseUrl.mockImplementation((url) => createUrlTree(url));
    route.url = createUrlSegments('/legacy-url');
    scully.available$ = of([
      createPost({ route: '/blog/post/1', title: 'non-matching' }),
      createPost({
        route: '/blog/post/2',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        legacy_url: '/legacy-url',
        title: 'legacy-matching',
      }),
    ]);

    expect(guard.canActivate(route, state)).toBeObservable(
      hot('(a|)', { a: createUrlTree('/blog/post/2') })
    );
  });
});
