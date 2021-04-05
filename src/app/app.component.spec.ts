import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator/jest';

import { AppComponent } from './app.component';
import { MockComponents } from 'ng-mocks';
import { NavigationBarComponent } from './shared/shell/navigation-bar/navigation-bar.component';
import { SlideOutMenuComponent } from './shared/shell/slide-out-menu/slide-out-menu.component';
import { RouterOutlet } from '@angular/router';
import { ENVIRONMENT_TOKEN } from './shared/di.tokens';
import { environment } from '../environments/environment';

describe('AppComponent', () => {
  const createComponent = createRoutingFactory({
    component: AppComponent,
    declarations: [
      MockComponents(
        RouterOutlet,
        NavigationBarComponent,
        SlideOutMenuComponent
      ),
    ],
    providers: [
      {
        provide: ENVIRONMENT_TOKEN,
        useValue: environment,
      },
    ],
  });
  let spectator: SpectatorRouting<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
