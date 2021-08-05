import { InjectionToken } from '@angular/core';

export const GOOGLE_ANALYTICS_TOKEN = new InjectionToken<UniversalAnalytics.ga>(
  'Google Analytics'
);
