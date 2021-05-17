import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator/jest';

import { SlideOutMenuComponent } from './slide-out-menu.component';
import { MockComponents } from 'ng-mocks';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NavigationListComponent } from '../navigation-list/navigation-list.component';
import { environment } from '../../../../environments/environment';
import { SocialMediaComponent } from '../../components/social-media/social-media.component';

describe('SlideOutMenuComponent', () => {
  const createComponent = createRoutingFactory({
    component: SlideOutMenuComponent,
    declarations: [
      MockComponents(
        FaIconComponent,
        NavigationListComponent,
        SocialMediaComponent
      ),
    ],
  });
  let spectator: SpectatorRouting<SlideOutMenuComponent>;
  let component: SlideOutMenuComponent;

  beforeEach(() => {
    spectator = createComponent({
      props: {
        socialMedia: environment.social,
        menuItems: environment.links,
      },
    });
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
