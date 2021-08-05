import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator/jest';
import { CookieConsentItemComponent } from './cookie-consent-item.component';
import { MockComponents } from 'ng-mocks';
import { ToggleSwitchComponent } from '../../../shared/components/toggle-switch/toggle-switch.component';
import { createCookieProvider } from '../../../testing/cookie.test-utils';

describe('CookieConsentItemComponent', () => {
  const createComponent = createRoutingFactory({
    component: CookieConsentItemComponent,
    declarations: [MockComponents(ToggleSwitchComponent)],
  });
  let spectator: SpectatorRouting<CookieConsentItemComponent>;
  let component: CookieConsentItemComponent;

  beforeEach(() => {
    spectator = createComponent({
      props: {
        item: {
          provider: createCookieProvider(),
          enabled: true,
        },
      },
    });
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
