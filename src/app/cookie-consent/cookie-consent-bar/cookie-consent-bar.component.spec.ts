import {
  createRoutingFactory,
  mockProvider,
  SpectatorRouting,
} from '@ngneat/spectator/jest';
import { CookieConsentBarComponent } from './cookie-consent-bar.component';
import { CookieConsentService } from '../cookie-consent.service';
import { of } from 'rxjs';

describe('CookieConsentBarComponent', () => {
  const createComponent = createRoutingFactory({
    component: CookieConsentBarComponent,
    declarations: [],
    providers: [
      mockProvider(CookieConsentService, {
        displayConsentBar$: of(true),
      }),
    ],
  });
  let spectator: SpectatorRouting<CookieConsentBarComponent>;
  let component: CookieConsentBarComponent;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
