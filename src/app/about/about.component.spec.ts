import { AboutComponent } from './about.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ENVIRONMENT_TOKEN } from '../shared/di.tokens';
import { environment } from '../../environments/environment';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

describe('AboutComponent', () => {
  const createComponent = createComponentFactory({
    component: AboutComponent,
    declarations: [FaIconComponent],
    providers: [
      {
        provide: ENVIRONMENT_TOKEN,
        useValue: environment,
      },
    ],
  });
  let spectator: Spectator<AboutComponent>;
  let component: AboutComponent;

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
