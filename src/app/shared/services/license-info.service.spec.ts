import {
  createServiceFactory,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator/jest';
import { LicenseInfoService } from './license-info.service';
import { Router } from '@angular/router';
import { ENVIRONMENT_TOKEN } from '../di.tokens';
import { environment } from '../../../environments/environment';
import { LicenseRepositoryService } from './license-repository.service';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { createEnvironment } from '../../testing/environment.test-utils';
import { EMPTY, of } from 'rxjs';
import { createPostAsScullyRoute } from '../../testing/post.test-utils';
import { waitForAsync } from '@angular/core/testing';
import { createRouteRecognizedEvent } from '../../testing/routing.test-utils';
import {
  createLicenseItem,
  createOpenSourceLicense,
} from '../../testing/license.test-util';
import { LicenseItem } from '../../models/license-info.model';
import { License } from '../../models/license.model';

describe('LicenseInfoService', () => {
  const createService = createServiceFactory({
    service: LicenseInfoService,
    mocks: [Router, ScullyRoutesService, LicenseRepositoryService],
    providers: [
      {
        provide: ENVIRONMENT_TOKEN,
        useValue: createEnvironment({
          globalLicenses: [],
        }),
      },
    ],
  });
  let spectator: SpectatorService<LicenseInfoService>;
  let service: LicenseInfoService;

  let router: SpyObject<Router>;
  let scully: SpyObject<ScullyRoutesService>;
  let repository: SpyObject<LicenseRepositoryService>;

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;

    router = spectator.inject(Router);
    (router.events as any) = EMPTY;

    scully = spectator.inject(ScullyRoutesService);
    scully.getCurrent.mockReturnValue(EMPTY);

    repository = spectator.inject(LicenseRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('activeRouteLicenses$ getter', () => {
    describe('scully route', () => {
      it(
        'should retrieve licenses from scully route',
        waitForAsync(() => {
          const scullyRoute = createPostAsScullyRoute();
          scully.getCurrent.mockReturnValue(of(scullyRoute));

          service.activeRouteLicenses$.subscribe((licenses) => {
            expect(licenses).toEqual(scullyRoute.licenses);
          });
        })
      );
    });

    describe('route data', () => {
      it(
        'should retrieve licenses from active route (event)',
        waitForAsync(() => {
          const license = createLicenseItem();
          const event = createRouteRecognizedEvent('/foo/bar/baz', {
            foo: [],
            bar: [license],
            baz: [],
          });

          (router.events as any) = of(event);

          service.activeRouteLicenses$.subscribe((licenses) => {
            expect(licenses).toEqual([license]);
          });
        })
      );

      it(
        'should remove duplicate licenses from active route (event)',
        waitForAsync(() => {
          const license = createLicenseItem();
          const event = createRouteRecognizedEvent('/foo/bar/baz', {
            foo: [license],
            bar: [license],
            baz: [license],
          });

          (router.events as any) = of(event);

          service.activeRouteLicenses$.subscribe((licenses) => {
            expect(licenses).toHaveLength(1);
            expect(licenses[0]).toEqual(license);
          });
        })
      );
    });

    describe('environment', () => {
      it(
        'retrieve global licenses from Environment',
        waitForAsync(() => {
          const globalLicenses = createLicenseItem();
          (service as any).environment = { globalLicenses };

          service.activeRouteLicenses$.subscribe((licenses) => {
            expect(licenses).toEqual(globalLicenses);
          });
        })
      );
    });

    describe('enhancement', () => {
      let license: License;
      let licenseItem: LicenseItem;

      beforeEach(() => {
        license = createOpenSourceLicense();
        licenseItem = createLicenseItem();
      });

      describe('with partial licenseItem from scully route', () => {
        const properties = ['licenseType', 'from'];

        properties.forEach((property) => {
          it(
            `should enhance items with licenseItem information from "${property}"-property`,
            waitForAsync(() => {
              const otherProperty = properties.find(
                (each) => each !== property
              ) as keyof LicenseItem;

              const scullyRoute = createPostAsScullyRoute({
                licenses: [
                  {
                    ...licenseItem,
                    [otherProperty]: null,
                  },
                ],
              });
              scully.getCurrent.mockReturnValue(of(scullyRoute));

              repository.getLicense.mockReturnValue(license);

              service.activeRouteLicenses$.subscribe((licenses) => {
                expect(licenses).toHaveLength(1);
                const enhanced = licenses[0];
                expect(enhanced.licenseType).toEqual(license.name);
                expect(enhanced.licenseUrl).toEqual(license.url);
              });
            })
          );

          it(
            `should throw an error, if unable to retrieve license from "${property}"-property`,
            waitForAsync(() => {
              const scullyRoute = createPostAsScullyRoute({
                licenses: [
                  {
                    ...licenseItem,
                    [property]: null,
                  },
                ],
              });
              scully.getCurrent.mockReturnValue(of(scullyRoute));

              repository.getLicense.mockReturnValue(null);

              service.activeRouteLicenses$.subscribe(
                () => fail('should throw error'),
                (error: Error) =>
                  expect(error.message).toContain(
                    'Unable to derive license for'
                  )
              );
            })
          );
        });
      });

      describe('with partial licenseItem from route data', () => {
        const properties = ['licenseType', 'from'];

        properties.forEach((property) => {
          it(
            `should enhance items with licenseItem information from "${property}"-property`,
            waitForAsync(() => {
              const otherProperty = properties.find(
                (each) => each !== property
              ) as keyof LicenseItem;

              const event = createRouteRecognizedEvent('/foo/bar/baz', {
                foo: [],
                bar: [
                  {
                    ...license,
                    [otherProperty]: null,
                  },
                ],
                baz: [],
              });

              (router.events as any) = of(event);

              repository.getLicense.mockReturnValue(license);

              service.activeRouteLicenses$.subscribe((licenses) => {
                expect(licenses).toHaveLength(1);
                const enhanced = licenses[0];
                expect(enhanced.licenseType).toEqual(license.name);
                expect(enhanced.licenseUrl).toEqual(license.url);
              });
            })
          );

          it(
            `should throw an error, if unable to retrieve license from "${property}"-property`,
            waitForAsync(() => {
              const event = createRouteRecognizedEvent('/foo/bar/baz', {
                foo: [],
                bar: [
                  {
                    ...license,
                    [property]: null,
                  },
                ],
                baz: [],
              });

              (router.events as any) = of(event);

              repository.getLicense.mockReturnValue(null);

              service.activeRouteLicenses$.subscribe(
                () => fail('should throw error'),
                (error: Error) =>
                  expect(error.message).toContain(
                    'Unable to derive license for'
                  )
              );
            })
          );
        });
      });

      describe('with partial licenseItem from environment', () => {
        const properties = ['licenseType', 'from'];

        properties.forEach((property) => {
          it(
            `should enhance items with licenseItem information from "${property}"-property`,
            waitForAsync(() => {
              const otherProperty = properties.find(
                (each) => each !== property
              ) as keyof LicenseItem;

              (service as any).environment = {
                globalLicenses: [{ ...license, [otherProperty]: null }],
              };

              repository.getLicense.mockReturnValue(license);

              service.activeRouteLicenses$.subscribe((licenses) => {
                expect(licenses).toHaveLength(1);
                const enhanced = licenses[0];
                expect(enhanced.licenseType).toEqual(license.name);
                expect(enhanced.licenseUrl).toEqual(license.url);
              });
            })
          );

          it(
            `should throw an error, if unable to retrieve license from "${property}"-property`,
            waitForAsync(() => {
              (service as any).environment = {
                globalLicenses: [{ ...license, [property]: null }],
              };

              repository.getLicense.mockReturnValue(null);

              service.activeRouteLicenses$.subscribe(
                () => fail('should throw error'),
                (error: Error) =>
                  expect(error.message).toContain(
                    'Unable to derive license for'
                  )
              );
            })
          );
        });
      });
    });
  });
});
