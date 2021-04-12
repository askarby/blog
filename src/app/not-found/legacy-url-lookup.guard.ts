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
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LegacyUrlLookupGuard implements CanActivate {
  constructor(private scully: ScullyRoutesService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const url = route.url.join('/');
    return this.findRouteForLegacyUrl(url).pipe(
      map((found) => {
        if (found) {
          return this.router.parseUrl(found.route);
        } else {
          return true;
        }
      })
    );
  }

  private findRouteForLegacyUrl(
    url: string
  ): Observable<ScullyRoute | undefined> {
    return this.scully.available$.pipe(
      map((availableRoutes) =>
        availableRoutes.find((candidate) => candidate.legacy_url?.endsWith(url))
      )
    );
  }
}
