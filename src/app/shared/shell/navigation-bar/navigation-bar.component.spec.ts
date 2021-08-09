import {
  createRoutingFactory,
  SpectatorRouting,
  SpyObject,
} from '@ngneat/spectator/jest';

import { NavigationBarComponent } from './navigation-bar.component';
import { MockComponents } from 'ng-mocks';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NavigationListComponent } from '../navigation-list/navigation-list.component';
import { WINDOW_TOKEN } from '../../di.tokens';
import { createSpyObj } from 'jest-createspyobj';

describe('NavigationBarComponent', () => {
  const createComponent = createRoutingFactory({
    component: NavigationBarComponent,
    declarations: [MockComponents(FaIconComponent, NavigationListComponent)],
    providers: [
      {
        provide: WINDOW_TOKEN,
        useFactory: () => createSpyObj('Window', ['scrollTo']),
      },
    ],
  });
  let spectator: SpectatorRouting<NavigationBarComponent>;
  let component: NavigationBarComponent;
  let window: SpyObject<Window>;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    window = spectator.inject(WINDOW_TOKEN);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('logo', () => {
    it('should "scroll to top" of page when clicked', () => {
      spectator.click('.logo');
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });
  });
});
