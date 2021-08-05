import {
  createRoutingFactory,
  mockProvider,
  SpectatorRouting,
} from '@ngneat/spectator/jest';
import { CookieConsentPreferencesComponent } from './cookie-consent-preferences.component';
import { CookieConsentService } from '../cookie-consent.service';
import { of } from 'rxjs';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { MockComponent } from 'ng-mocks';
import { CookieConsentItemComponent } from './cookie-consent-item/cookie-consent-item.component';

describe('CookieConsentPreferencesComponent', () => {
  const createComponent = createRoutingFactory({
    component: CookieConsentPreferencesComponent,
    declarations: [MockComponent(CookieConsentItemComponent)],
    providers: [
      mockProvider(CookieConsentService, {
        displayConsentPreferences$: of(true),
      }),
    ],
    imports: [FontAwesomeTestingModule],
  });
  let spectator: SpectatorRouting<CookieConsentPreferencesComponent>;
  let component: CookieConsentPreferencesComponent;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
