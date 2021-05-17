/* eslint-disable @typescript-eslint/naming-convention */
import { Inject, Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { LicenseItem } from '../../models/license-info.model';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { filterAndCast } from '../operators/filter-and-cast.operator';
import { ENVIRONMENT_TOKEN } from '../di.tokens';
import { Environment } from '../../../environments/environment.model';
import { LicenseRepositoryService } from './license-repository.service';

@Injectable({
  providedIn: 'root',
})
export class LicenseInfoService {
  constructor(
    private router: Router,
    private scully: ScullyRoutesService,
    private repository: LicenseRepositoryService,
    @Inject(ENVIRONMENT_TOKEN) private environment: Environment
  ) {}

  get activeRouteLicenses$(): Observable<LicenseItem[]> {
    return combineLatest([
      this.scully.getCurrent(),
      this.router.events.pipe(filterAndCast(RoutesRecognized)),
    ]).pipe(
      // Extract licenses from routes and global configuration
      map(([scullyRoute, routeEvent]) => [
        ...this.getLicensesFromScullyRoute(scullyRoute),
        ...this.getLicensesFromRouteEvent(routeEvent),
        ...this.environment.globalLicenses,
      ]),
      map((licenses: LicenseItem[]) =>
        licenses.map((each) => {
          const license = this.repository.getLicense(
            each.licenseType ?? each.from
          );
          if (!license) {
            throw new Error(
              'Unable to derive license for: ' + JSON.stringify(each)
            );
          }
          return {
            ...each,
            licenseType: license.name,
            licenseUrl: license.url,
          };
        })
      )
    );
  }

  private getLicensesFromScullyRoute(route: ScullyRoute): LicenseItem[] {
    if (route && 'licenses' in route) {
      return route.licenses;
    }
    return [];
  }

  private getLicensesFromRouteEvent(event: RoutesRecognized): LicenseItem[] {
    const discovered: LicenseItem[] = [];

    // Iterate route's hierarchical structure, and extract 'discovered'-entries
    // from data, and combine them to produce all of them in a single array.
    let snapshot = event.state.root;
    while (snapshot.firstChild) {
      snapshot = snapshot.firstChild;
      if ('licenses' in snapshot.data) {
        const licenses = snapshot.data.licenses as LicenseItem[];
        for (const license of licenses) {
          // If a parent already has already discovered a reference to the license
          // simply ignore it (we do NOT want duplicates)
          const isAlreadyDiscovered = discovered.some(
            (each) => each.url === license.url
          );
          if (!isAlreadyDiscovered) {
            discovered.push({ ...license });
          }
        }
      }
    }
    return discovered;
  }
}
