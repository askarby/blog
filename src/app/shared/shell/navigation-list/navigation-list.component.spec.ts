import { NavigationListComponent } from './navigation-list.component';
import {
  createRoutingFactory,
  SpectatorRouting,
  SpyObject,
} from '@ngneat/spectator/jest';
import { WINDOW_TOKEN } from '../../di.tokens';
import { createSpyObj } from 'jest-createspyobj';
import {
  createExternalLink,
  createInternalLink,
} from '../../../testing/navigation.test-utils';

describe('NavigationListComponent', () => {
  const createComponent = createRoutingFactory({
    component: NavigationListComponent,
    providers: [
      {
        provide: WINDOW_TOKEN,
        useFactory: () => createSpyObj('Window', ['scrollTo']),
      },
    ],
  });
  let spectator: SpectatorRouting<NavigationListComponent>;
  let component: NavigationListComponent;
  let window: SpyObject<Window>;

  beforeEach(() => {
    spectator = createComponent({
      props: {
        menuItems: [createInternalLink(), createExternalLink()],
      },
    });
    component = spectator.component;

    window = spectator.inject(WINDOW_TOKEN);
  });

  it('should be created', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('internal link', () => {
    it('should "scroll to top" of page when clicked', () => {
      spectator.click('a[routerlinkactive]');
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });
  });
});
