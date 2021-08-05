import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CookieConsentBarComponent } from './cookie-consent-bar/cookie-consent-bar.component';
import { CommonModule } from '@angular/common';
import { CookieConsentPreferencesComponent } from './cookie-consent-preferences/cookie-consent-preferences.component';
import { CookieProvider } from './cookie-provider.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieConsentItemComponent } from './cookie-consent-preferences/cookie-consent-item/cookie-consent-item.component';
import { SharedComponentsModule } from '../shared/components/shared-components.module';

export const COOKIE_PROVIDERS = new InjectionToken<CookieProvider>(
  'COOKIE_PROVIDERS'
);

@NgModule({
  imports: [CommonModule, FontAwesomeModule, SharedComponentsModule],
  declarations: [
    CookieConsentBarComponent,
    CookieConsentPreferencesComponent,
    CookieConsentItemComponent,
  ],
  exports: [CookieConsentBarComponent, CookieConsentPreferencesComponent],
})
export class CookieConsentModule {
  static forRoot(
    cookieProviders: CookieProvider[]
  ): ModuleWithProviders<CookieConsentModule> {
    return {
      ngModule: CookieConsentModule,
      providers: [
        { provide: COOKIE_PROVIDERS, multi: true, useValue: cookieProviders },
      ],
    };
  }
}
