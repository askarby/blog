import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { GOOGLE_ANALYTICS_TOKEN } from './google-analytics.tokens';
import { CookieConsentModule } from '../cookie-consent/cookie-consent.module';

export const ANALYTICS_CONFIGURATION_TOKEN = new InjectionToken<AnalyticsConfiguration>(
  'ANALYTICS_CONFIGURATION'
);

export interface AnalyticsConfiguration {
  /**
   * Determine if enabled or not.
   *
   * Useful if running in development mode, and don't want to track user interaction.
   */
  enabled: boolean;

  /**
   * Tracking id for Google Analytics.
   */
  googleAnalyticsTrackingId: string;
}

@NgModule({
  imports: [CookieConsentModule],
})
export class AnalyticsModule {
  static forRoot(
    config: AnalyticsConfiguration
  ): ModuleWithProviders<AnalyticsModule> {
    return {
      ngModule: AnalyticsModule,
      providers: [
        {
          provide: ANALYTICS_CONFIGURATION_TOKEN,
          useValue: config,
        },
        {
          provide: GOOGLE_ANALYTICS_TOKEN,
          useValue: window.ga,
        },
      ],
    };
  }
}
