import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ENVIRONMENT_TOKEN } from './shared/di.tokens';
import { Environment } from '../environments/environment.model';
import { LicenseInfoService } from './shared/services/license-info.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { LicenseItem } from './models/license-info.model';
import { CookieConsentService } from './cookie-consent/cookie-consent.service';
import { GoogleAnalyticsService } from './analytics/google-analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  menuShown = false;
  licenseItems$: Observable<LicenseItem[]>;
  displayCookieAccess$: Observable<boolean>;

  private destroy$ = new Subject<void>();

  constructor(
    @Inject(ENVIRONMENT_TOKEN) public environment: Environment,
    private cookieConsentService: CookieConsentService,
    private licenseInfoService: LicenseInfoService,
    private router: Router,
    private analyticsService: GoogleAnalyticsService
  ) {
    this.licenseItems$ = licenseInfoService.activeRouteLicenses$;
    this.displayCookieAccess$ = cookieConsentService.displayConsentBar$.pipe(
      map((displayBar) => !displayBar)
    );
    this.analyticsService.initialize();
  }

  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.menuShown = false;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleMenu(): void {
    this.menuShown = !this.menuShown;
  }

  toggleCookiePreferences() {
    this.cookieConsentService.displayConsentPreferences();
  }
}
