import { Subject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { GOOGLE_ANALYTICS_TOKEN } from './google-analytics.tokens';
import { NavigationEnd, Router } from '@angular/router';
import { filterAndCast } from '../shared/operators/filter-and-cast.operator';
import { takeUntil } from 'rxjs/operators';
import { CookieConsentService } from '../cookie-consent/cookie-consent.service';
import {
  ANALYTICS_CONFIGURATION_TOKEN,
  AnalyticsConfiguration,
} from './analytics.module';

export const GOOGLE_ANALYTICS_COOKIE_PROVIDER_ID =
  '[CookieProvider] Google analytics';

export const enum AnalyticsTypeEvent {
  pageView = 'PAGE_VIEW',
  event = 'EVENT',
}

export interface AnalyticsEvent {
  type: AnalyticsTypeEvent;
  category?: string;
  action?: string;
  label: string;
}

export interface AnalyticsTrackingConfiguration {
  trackRouting: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  private eventsQueue$ = new Subject<AnalyticsEvent>();
  private stopTracking$ = new Subject<void>();

  constructor(
    @Inject(GOOGLE_ANALYTICS_TOKEN) private ga: UniversalAnalytics.ga,
    @Inject(ANALYTICS_CONFIGURATION_TOKEN)
    private configuration: AnalyticsConfiguration,
    private cookieConsentService: CookieConsentService,
    private router: Router
  ) {}

  public initialize() {
    this.cookieConsentService
      .getChangesTo(GOOGLE_ANALYTICS_COOKIE_PROVIDER_ID)
      .subscribe((enabled) => {
        if (enabled) {
          this.startTracking({
            trackRouting: true,
          });
        } else {
          this.stopTracking();
        }
      });
  }

  public startTracking(config: AnalyticsTrackingConfiguration): void {
    this.ga('create', this.configuration.googleAnalyticsTrackingId, 'auto');
    this.subscribeToEvents();

    if (config.trackRouting) {
      this.addRouteTracking();
    }
  }

  public stopTracking(): void {
    this.stopTracking$.next();
  }

  public trackVirtualPageView(name: string): void {
    this.eventsQueue$.next({ type: AnalyticsTypeEvent.pageView, label: name });
  }

  public trackEvent(category: string, action: string, label: string) {
    this.eventsQueue$.next({
      type: AnalyticsTypeEvent.event,
      category,
      action,
      label,
    });
  }

  private addRouteTracking(): void {
    // Track events that WILL occur
    this.router.events
      .pipe(filterAndCast(NavigationEnd))
      .subscribe(({ urlAfterRedirects }) =>
        this.trackVirtualPageView(urlAfterRedirects)
      );

    // Track current page, as a view
    this.trackVirtualPageView(this.router.url);
  }

  private subscribeToEvents(): void {
    this.eventsQueue$
      .pipe(takeUntil(this.stopTracking$))
      .subscribe((event: AnalyticsEvent) => {
        if (!this.configuration.enabled) {
          console.log(
            'ℹ️ Submitting event to %cGoogle Analytics %c(can be disabled in Cookies panel): %o',
            'color: #4285F4',
            'color: unset',
            { event }
          );
          return;
        }

        switch (event.type) {
          case AnalyticsTypeEvent.pageView:
            this.ga('send', {
              hitType: 'pageview',
              page: event.label,
            });
            return;
          case AnalyticsTypeEvent.event:
            this.ga('send', {
              hitType: 'event',
              eventCategory: event.category,
              eventAction: event.action,
              eventLabel: event.label,
            });
            return;
        }
      });
  }
}
