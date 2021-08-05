import {
  createServiceFactory,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator/jest';
import {
  BAILOUT_SESSION_KEY,
  CookieConsentService,
  DEFAULT_SETTINGS_PROVIDER,
  PERSISTED_COOKIE_SETTINGS_KEY,
} from './cookie-consent.service';
import { COOKIE_PROVIDERS } from './cookie-consent.module';
import { CookieProvider } from './cookie-provider.model';
import {
  LOCAL_STORAGE_TOKEN,
  SESSION_STORAGE_TOKEN,
} from '../shared/di.tokens';
import {
  createCookieProvider,
  createCookieProviders,
  createPersistedCookieSettings,
} from '../testing/cookie.test-utils';
import { flatten } from '../shared/utilities/array.utility';
import { fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { first, skip, take } from 'rxjs/operators';
import { createStorageProvider } from '../testing/providers/storage-provider.test-utils';
import { createSpyObj } from 'jest-createspyobj';
import { hot } from 'jest-marbles';
import {
  CookieEnablement,
  sortByImportanceAndName,
} from './cookie-enablement.model';

describe('CookieConsentService', () => {
  const createService = createServiceFactory({
    service: CookieConsentService,
    providers: [
      {
        provide: COOKIE_PROVIDERS,
        multi: true,
        useValue: createCookieProviders(5),
      },
      createStorageProvider(SESSION_STORAGE_TOKEN),
      createStorageProvider(LOCAL_STORAGE_TOKEN),
    ],
  });

  let spectator: SpectatorService<CookieConsentService>;
  let service: CookieConsentService;
  let providers: CookieProvider[];

  let localStorage: SpyObject<Storage>;
  let sessionStorage: SpyObject<Storage>;

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;

    providers = flatten(
      (spectator.inject(COOKIE_PROVIDERS) as any) as CookieProvider[][]
    );

    localStorage = spectator.inject(LOCAL_STORAGE_TOKEN);
    sessionStorage = spectator.inject(SESSION_STORAGE_TOKEN);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('displayConsentBar', () => {
    it(
      'should emit on "true" on displayConsentBar$',
      waitForAsync(() => {
        service.displayConsentBar$
          .pipe(
            // Skip the default event emitted
            skip(1),
            // Take the next, issued by the invocation
            take(1)
          )
          .subscribe((display) => expect(display).toBeTrue());

        service.displayConsentBar();
      })
    );
  });

  describe('hideConsentBar', () => {
    it(
      'should emit on "false" on displayConsentBar$',
      waitForAsync(() => {
        service.displayConsentBar$
          .pipe(
            // Skip the default event emitted
            skip(1),
            // Take the next, issued by the invocation
            take(1)
          )
          .subscribe((display) => expect(display).toBeFalse());

        service.hideConsentBar();
      })
    );
  });

  describe('displayConsentPreferences', () => {
    it(
      'should emit on "true" on displayConsentPreferences$',
      waitForAsync(() => {
        service.displayConsentPreferences$
          .pipe(
            // Skip the default event emitted
            skip(1),
            // Take the next, issued by the invocation
            take(1)
          )
          .subscribe((display) => expect(display).toBeTrue());

        service.displayConsentPreferences();
      })
    );
  });

  describe('hideConsentPreferences', () => {
    it(
      'should emit on "false" on displayConsentPreferences$',
      waitForAsync(() => {
        service.displayConsentPreferences$
          .pipe(
            // Skip the default event emitted
            skip(1),
            // Take the next, issued by the invocation
            take(1)
          )
          .subscribe((display) => expect(display).toBeFalse());

        service.hideConsentPreferences();
      })
    );
  });

  describe('approve', () => {
    it('should set the enablement of a specific cookie to "true" (enabled)', () => {
      const provider = providers[0];

      service.approve(provider);
      expect(service.isApproved(provider.id)).toBeTrue();

      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should throw an error if attempting to approve "default settings"', () => {
      expect(() => {
        service.approve(DEFAULT_SETTINGS_PROVIDER);
      }).toThrow();
    });
  });

  describe('reject', () => {
    it('should set the enablement of a specific cookie to "false" (disabled)', () => {
      const provider = providers[0];

      service.reject(provider);
      expect(service.isApproved(provider.id)).toBeFalse();

      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should throw an error if attempting to reject "default settings"', () => {
      expect(() => {
        service.reject(DEFAULT_SETTINGS_PROVIDER);
      }).toThrow();
    });
  });

  describe('approveAll', () => {
    it('should set the enablement of all cookies to "true" (enabled)', () => {
      service.approveAll();
      providers.forEach((provider) =>
        expect(service.isApproved(provider.id)).toBeTrue()
      );

      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('rejectAll', () => {
    it('should set the enablement of all cookies to "false" (disabled)', () => {
      service.rejectAll();
      providers.forEach((provider) =>
        expect(service.isApproved(provider.id)).toBeFalse()
      );

      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should not alter the default approved state of "default settings"', () => {
      service.rejectAll();
      expect(service.isApproved(DEFAULT_SETTINGS_PROVIDER.id)).toBeTrue();
    });
  });

  describe('setOne', () => {
    it('should be able to enable a specific provider', () => {
      const provider = providers[0];
      service.setOne(provider, true);
      expect(service.isApproved(provider.id)).toBeTrue();
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should be able to disable a specific provider', () => {
      const provider = providers[0];
      service.setOne(provider, false);
      expect(service.isApproved(provider.id)).toBeFalse();
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should throw an error if attempting to set value for absent provider', () => {
      expect(() =>
        service.setOne(createCookieProvider({ id: 'surely-not-there' }), true)
      ).toThrow();
    });

    it('should throw an error if attempting to set value for "default settings"', () => {
      expect(() => {
        service.setOne(DEFAULT_SETTINGS_PROVIDER, true);
      }).toThrow();
    });
  });

  describe('setMany', () => {
    it('should be able to enable several providers', () => {
      const a = providers[0].id;
      const b = providers[1].id;
      service.setMany({ [a]: true, [b]: true });
      expect(service.isApproved(a)).toBeTrue();
      expect(service.isApproved(b)).toBeTrue();
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it('should be able to disable several providers', () => {
      const a = providers[0].id;
      const b = providers[1].id;
      service.setMany({ [a]: false, [b]: false });
      expect(service.isApproved('a')).toBeFalse();
      expect(service.isApproved('b')).toBeFalse();
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if attempting to set value for absent provider', () => {
      expect(() =>
        service.setMany({ 'surely-not-there': true, 'absent-as-well': false })
      ).toThrow();
    });

    it('should throw an error if attempting to set value for "default settings"', () => {
      expect(() =>
        service.setMany({ [DEFAULT_SETTINGS_PROVIDER.id]: true })
      ).toThrow();
    });
  });

  describe('setAll', () => {
    it('should be able to enable all providers', () => {
      service.setAll(true);
      for (const each of providers) {
        expect(service.isApproved(each.id)).toBeTrue();
      }
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it('should be able to disable all providers', () => {
      service.setAll(false);
      for (const each of providers) {
        expect(service.isApproved(each.id)).toBeFalse();
      }
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it('should not affect approved state for "default settings"', () => {
      service.setAll(false);
      expect(service.isApproved(DEFAULT_SETTINGS_PROVIDER.id)).toBeTrue();
    });
  });

  describe('isApproved', () => {
    it('should return true if provider is approved / enabled', () => {
      service.approve(providers[0]);
      expect(service.isApproved(providers[0].id)).toBeTrue();
    });

    it('should return false if provider is rejected / disabled', () => {
      service.reject(providers[0]);
      expect(service.isApproved(providers[0].id)).toBeFalse();
    });
  });

  describe('observable streams', () => {
    describe('getChangesTo', () => {
      it(
        'should notify of changes to the enablement of a specific provider',
        waitForAsync(() => {
          const providerOfInterest = providers[0];
          const notifications: boolean[] = [];
          service
            .getChangesTo(providerOfInterest.id)
            // Skip first (initial value)
            .pipe(skip(1))
            .subscribe((update) => {
              notifications.push(update);
            });

          service.approve(providerOfInterest);
          service.approve(providers[1]);
          service.approve(providers[2]);

          expect(notifications).toHaveLength(1);
          expect(notifications[0]).toBe(true);
        })
      );

      it(
        `should not notify when the provider's enablement does not change`,
        waitForAsync(() => {
          const providerOfInterest = providers[0];
          const notifications: boolean[] = [];
          service
            .getChangesTo(providerOfInterest.id)
            // Skip first (initial value)
            .pipe(skip(1))
            .subscribe((update) => {
              notifications.push(update);
            });

          service.approve(providerOfInterest);
          service.approve(providerOfInterest);

          expect(notifications).toHaveLength(1);
          expect(notifications[0]).toBe(true);
        })
      );
    });

    describe('cookieEnablement$', () => {
      let expectedState: CookieEnablement[];

      beforeEach(() => {
        expectedState = providers.map((provider) => ({
          provider,
          enabled: true,
        }));
        expectedState.unshift({
          provider: DEFAULT_SETTINGS_PROVIDER,
          enabled: true,
        });
        expectedState.sort(sortByImportanceAndName);
      });

      it('should notified of the enablement of all providers', () => {
        const expected = hot('a', {
          a: expectedState,
        });
        service.approveAll();
        expect(service.cookieEnablement$).toBeObservable(expected);
      });

      it('should repeatedly notified of the enablement of all providers', fakeAsync(() => {
        let notifications = 0;
        service.cookieEnablement$
          // Skip first (initial value)
          .pipe(skip(1))
          .subscribe((enablements) => {
            expect(enablements).toEqual(expectedState);
            notifications++;
          });

        service.approveAll();
        service.approveAll();
        tick();
        expect(notifications).toBe(2);
      }));
    });

    describe('cookieEnablementChanges$', () => {
      let totalProviderCount: number;

      beforeEach(() => {
        // Total no. of providers are provided ones in addition to default (settings)
        totalProviderCount = providers.length + 1;
      });

      it(
        'should notified of changes to the enablement of all providers',
        waitForAsync(() => {
          let notifications = 0;
          service.cookieEnablementChanges$
            // Skip first (initial) notifications
            .pipe(skip(totalProviderCount))
            .subscribe(() => {
              notifications++;
            });

          service.approve(providers[0]);
          expect(notifications).toEqual(totalProviderCount);
        })
      );

      it(
        'should not be notified when enablement does not change',
        waitForAsync(() => {
          let notifications = 0;
          service.cookieEnablementChanges$
            // Skip first (initial) notifications
            .pipe(skip(totalProviderCount))
            .subscribe(() => {
              notifications++;
            });

          service.approve(providers[0]);
          service.approve(providers[0]);
          expect(notifications).toEqual(totalProviderCount);
        })
      );
    });
  });
});

describe('CookieConsentService (no previous stored settings)', () => {
  const createService = createServiceFactory({
    service: CookieConsentService,
    providers: [
      {
        provide: COOKIE_PROVIDERS,
        multi: true,
        useValue: createCookieProviders(5),
      },
      createStorageProvider(SESSION_STORAGE_TOKEN),
      createStorageProvider(LOCAL_STORAGE_TOKEN),
    ],
  });

  let spectator: SpectatorService<CookieConsentService>;
  let service: CookieConsentService;
  let providers: CookieProvider[];

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;

    providers = flatten(
      (spectator.inject(COOKIE_PROVIDERS) as any) as CookieProvider[][]
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should only have "default settings" enabled', () => {
      expect(service.isApproved(DEFAULT_SETTINGS_PROVIDER.id)).toBeTrue();
      providers
        .filter((each) => each.id !== DEFAULT_SETTINGS_PROVIDER.id)
        .map((each) => each.id)
        .forEach((id) => expect(service.isApproved(id)).toBeFalse());
    });

    describe('displayConsentBar$', () => {
      it(
        'should per default emit true',
        waitForAsync(() => {
          service.displayConsentBar$
            .pipe(first())
            .subscribe((display) => expect(display).toBeTrue());
        })
      );
    });
  });
});

describe('CookieConsentService (previous rejected all)', () => {
  const createService = createServiceFactory({
    service: CookieConsentService,
    providers: [
      {
        provide: COOKIE_PROVIDERS,
        multi: true,
        useValue: createCookieProviders(5),
      },
      createStorageProvider(SESSION_STORAGE_TOKEN, {
        [BAILOUT_SESSION_KEY]: 'true',
      }),
      createStorageProvider(LOCAL_STORAGE_TOKEN),
    ],
  });

  let spectator: SpectatorService<CookieConsentService>;
  let service: CookieConsentService;
  let providers: CookieProvider[];

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;

    providers = flatten(
      (spectator.inject(COOKIE_PROVIDERS) as any) as CookieProvider[][]
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have "default settings" approved / enabled', () => {
      expect(service.isApproved(DEFAULT_SETTINGS_PROVIDER.id)).toBeTrue();
    });

    it('should have all providers set to rejected / disabled', () => {
      providers.forEach((provider) =>
        expect(service.isApproved(provider.id)).toBeFalse()
      );
    });

    describe('displayConsentBar$', () => {
      it(
        'should per default emit false',
        waitForAsync(() => {
          service.displayConsentBar$
            .pipe(first())
            .subscribe((display) => expect(display).toBeFalse());
        })
      );
    });
  });
});

describe('CookieConsentService (with previous stored settings)', () => {
  const createService = createServiceFactory({
    service: CookieConsentService,
    providers: [
      createStorageProvider(SESSION_STORAGE_TOKEN),
      {
        provide: COOKIE_PROVIDERS,
        multi: true,
        useValue: createCookieProviders(5),
      },
      {
        provide: LOCAL_STORAGE_TOKEN,
        deps: [COOKIE_PROVIDERS],
        useFactory: (provided: CookieProvider[][]) => {
          const storage = createSpyObj('Storage', [
            'setItem',
            'getItem',
            'removeItem',
          ]) as SpyObject<Storage>;

          const cookieEnablement = createPersistedCookieSettings({
            providers: flatten(provided),
            strategy: 'ENABLE_ALL',
          });
          const entries: { [key: string]: string } = {
            [PERSISTED_COOKIE_SETTINGS_KEY]: JSON.stringify(cookieEnablement),
          };
          storage.getItem.mockImplementation((key: string) => entries[key]);

          return storage;
        },
      },
    ],
  });

  let spectator: SpectatorService<CookieConsentService>;
  let service: CookieConsentService;
  let providers: CookieProvider[];

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;

    providers = flatten(
      (spectator.inject(COOKIE_PROVIDERS) as any) as CookieProvider[][]
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should set approval / enablement of providers based on persisted data', () => {
      providers.forEach((provider) =>
        expect(service.isApproved(provider.id)).toBeTrue()
      );
    });

    describe('displayConsentBar$', () => {
      it(
        'should per default emit false',
        waitForAsync(() => {
          service.displayConsentBar$
            .pipe(first())
            .subscribe((display) => expect(display).toBeFalse());
        })
      );
    });
  });
});
