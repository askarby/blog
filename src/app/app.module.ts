import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { CookieConsentModule } from './cookie-consent/cookie-consent.module';
import { GOOGLE_ANALYTICS_COOKIE_PROVIDER_ID } from './analytics/google-analytics.service';
import { AnalyticsModule } from './analytics/analytics.module';
import { environment } from '../environments/environment';
import { CookieImportance } from './cookie-consent/cookie-provider.model';
import { ShellModule } from './shared/shell/shell.module';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    ShellModule,
    AnalyticsModule.forRoot({
      enabled: environment.production,
      googleAnalyticsTrackingId:
        environment.analytics.googleAnalyticsTrackingId,
    }),
    CookieConsentModule.forRoot([
      {
        id: GOOGLE_ANALYTICS_COOKIE_PROVIDER_ID,
        importance: CookieImportance.primary,
        name: 'Google Analytics',
        description: 'Tracking behavior on the site',
      },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
