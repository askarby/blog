import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostExistsGuard implements CanActivate {
  constructor(private scully: ScullyRoutesService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const url = route.url.join('/');
    return this.getScullyRouteForUrl(url).pipe(
      map((found) => {
        if (found) {
          return true;
        } else {
          const queryParams = {
            attempted: url,
          };
          return this.router.parseUrl('/not-found');
        }
      })
    );
  }

  private getScullyRouteForUrl(
    url: string
  ): Observable<ScullyRoute | undefined> {
    return this.scully.available$.pipe(
      map((availableRoutes) =>
        availableRoutes.find((candidate) => candidate.route.endsWith(url))
      )
    );
  }
}
