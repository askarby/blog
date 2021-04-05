import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator/jest';

import { SlideOutMenuComponent } from './slide-out-menu.component';
import { MockComponents } from 'ng-mocks';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

describe('SlideOutMenuComponent', () => {
  const createComponent = createRoutingFactory({
    component: SlideOutMenuComponent,
    declarations: [
      MockComponents(FaIconComponent)
    ]
  });
  let spectator: SpectatorRouting<SlideOutMenuComponent>;
  let component: SlideOutMenuComponent;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
