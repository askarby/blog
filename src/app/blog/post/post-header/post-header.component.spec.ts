import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { PostHeaderComponent } from './post-header.component';
import { MockComponents } from 'ng-mocks';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { createPost } from '../../../testing/post.test-utils';

describe('PostHeaderComponent', () => {
  const createComponent = createComponentFactory({
    component: PostHeaderComponent,
    declarations: [MockComponents(FaIconComponent)],
  });

  let spectator: Spectator<PostHeaderComponent>;
  let component: PostHeaderComponent;

  beforeEach(() => {
    spectator = createComponent({
      props: {
        post: createPost(),
      },
    });
    component = spectator.component;
  });

  it('should be created', () => {
    expect(spectator.component).toBeTruthy();
  });
});
