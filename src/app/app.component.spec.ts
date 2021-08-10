import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest';

import { AppComponent } from './app.component';
import { MockComponents } from 'ng-mocks';
import { NavigationBarComponent } from './shared/shell/navigation-bar/navigation-bar.component';
import { SlideOutMenuComponent } from './shared/shell/slide-out-menu/slide-out-menu.component';
import { Router, RouterEvent, RouterOutlet } from '@angular/router';
import { ENVIRONMENT_TOKEN } from './shared/di.tokens';
import { PageFooterComponent } from './shared/shell/page-footer/page-footer.component';
import { LicenseInfoService } from './shared/services/license-info.service';
import { createEnvironment } from './testing/environment.test-utils';
import { Environment } from '../environments/environment.model';
import { LicenseItem } from './models/license-info.model';
import { createLicenseItem } from './testing/license.test-util';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CookieConsentBarComponent } from './cookie-consent/cookie-consent-bar/cookie-consent-bar.component';
import { CookieConsentPreferencesComponent } from './cookie-consent/cookie-consent-preferences/cookie-consent-preferences.component';
import { CookieConsentService } from './cookie-consent/cookie-consent.service';
import { GoogleAnalyticsService } from './analytics/google-analytics.service';

describe('AppComponent', () => {
  const licenses = new BehaviorSubject<LicenseItem[]>([]);
  const displayConsentBar = new Subject<boolean>();
  const routerEvents = new Subject<RouterEvent>();

  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [
      MockComponents(
        RouterOutlet,
        NavigationBarComponent,
        SlideOutMenuComponent,
        PageFooterComponent,
        CookieConsentBarComponent,
        CookieConsentPreferencesComponent
      ),
    ],
    mocks: [GoogleAnalyticsService],
    providers: [
      {
        provide: ENVIRONMENT_TOKEN,
        useValue: createEnvironment(),
      },
      mockProvider(LicenseInfoService, {
        get activeRouteLicenses$(): Observable<LicenseItem[]> {
          return licenses.asObservable();
        },
      }),
      mockProvider(Router, {
        events: routerEvents.asObservable(),
      }),
      mockProvider(CookieConsentService, {
        get displayConsentBar$(): Observable<boolean> {
          return displayConsentBar.asObservable();
        },
      }),
    ],
  });
  let spectator: Spectator<AppComponent>;
  let component: AppComponent;

  let env: Environment;
  let licenseItems: LicenseItem[];

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    env = spectator.inject(ENVIRONMENT_TOKEN);
    licenseItems = [createLicenseItem()];

    licenses.next(licenseItems);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('Routing', () => {
    it('should hide the menu, when navigation occurs', () => {
      // Ensure that menu "is shown"
      component.menuShown = true;

      routerEvents.next({
        id: 0,
        url: '/some-url/of-lesser-importance',
      });

      expect(component.menuShown).toBeFalse();
    });
  });

  describe('app bar navigation', () => {
    let navigationBar: NavigationBarComponent | null;

    beforeEach(() => {
      navigationBar = spectator.query(NavigationBarComponent);
    });

    it('should be rendered using the app-navigation-bar component', () => {
      expect(navigationBar).not.toBeNull();
    });

    it('should bind the site name to the "siteName"-input of component', () => {
      expect(navigationBar?.siteName).toEqual(env.site.name);
    });

    it('should bind the menu items to the "menuItems"-input of component', () => {
      expect(navigationBar?.menuItems).toEqual(env.links);
    });

    it('should toggle the menu, when a menu item is triggered', () => {
      jest.spyOn(component, 'toggleMenu');

      navigationBar?.showMenu.emit();

      expect(component.toggleMenu).toHaveBeenCalled();
    });
  });

  describe('slide out menu', () => {
    let slideOutMenu: SlideOutMenuComponent | null;

    beforeEach(() => {
      slideOutMenu = spectator.query(SlideOutMenuComponent);
    });

    it('should be rendered using the app-slide-out-menu component', () => {
      expect(slideOutMenu).not.toBeNull();
    });

    it('should bind the menu items to the "menuItems"-input of component', () => {
      expect(slideOutMenu?.menuItems).toEqual(env.links);
    });

    it('should bind the menu shown property to the "menuShown"-input of component', () => {
      expect(slideOutMenu?.menuShown).toEqual(component.menuShown);
    });

    it('should bind the social media links to the "socialMedia"-input of component', () => {
      expect(slideOutMenu?.socialMedia).toEqual(env.social);
    });

    it('should toggle the menu, when the menu is closed', () => {
      jest.spyOn(component, 'toggleMenu');

      slideOutMenu?.closeMenu.emit();

      expect(component.toggleMenu).toHaveBeenCalled();
    });
  });

  describe('page footer', () => {
    let footer: PageFooterComponent | null;

    beforeEach(() => {
      footer = spectator.query(PageFooterComponent);
    });

    it('should be rendered using the app-page-footer component', () => {
      expect(footer).not.toBeNull();
    });

    it('should bind the social media links to the "socialMedia"-input of component', () => {
      expect(footer?.socialMedia).toEqual(env.social);
    });

    it('should bind the menu items from environment to the "menuItems"-input of component', () => {
      expect(footer?.menuItems).toEqual(env.links);
    });

    it('should bind the license items (from the LicenseInfoService) to the "licenseItems"-input of component', () => {
      expect(footer?.licenseItems).toEqual(licenseItems);
    });
  });
});
