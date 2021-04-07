import { NavigationListComponent } from './navigation-list.component';
import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator/jest';

describe('NavigationListComponent', () => {
  const createComponent = createRoutingFactory({
    component: NavigationListComponent,
  });
  let spectator: SpectatorRouting<NavigationListComponent>;
  let component: NavigationListComponent;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should be create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
