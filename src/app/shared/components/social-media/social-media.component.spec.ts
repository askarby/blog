import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { SocialMediaComponent } from './social-media.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MockComponent } from 'ng-mocks';
import { createSocialMedia } from '../../../testing/environment.test-utils';

describe('SocialMediaComponent', () => {
  const createComponent = createComponentFactory({
    component: SocialMediaComponent,
    declarations: [MockComponent(FaIconComponent)],
  });
  let spectator: Spectator<SocialMediaComponent>;
  let component: SocialMediaComponent;

  beforeEach(() => {
    spectator = createComponent({
      props: {
        socialMedia: createSocialMedia(),
      },
    });
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
