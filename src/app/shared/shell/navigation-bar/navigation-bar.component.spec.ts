import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator/jest';

import { NavigationBarComponent } from './navigation-bar.component';
import { MockComponents } from 'ng-mocks';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NavigationListComponent } from '../navigation-list/navigation-list.component';

describe('NavigationBarComponent', () => {
  const createComponent = createRoutingFactory({
    component: NavigationBarComponent,
    declarations: [MockComponents(FaIconComponent, NavigationListComponent)],
  });
  let spectator: SpectatorRouting<NavigationBarComponent>;
  let component: NavigationBarComponent;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
