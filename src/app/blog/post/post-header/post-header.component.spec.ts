import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { PostHeaderComponent } from './post-header.component';
import { createPost } from '../../testing/post.test-utils';

describe('PostHeaderComponent', () => {
  const createComponent = createComponentFactory(PostHeaderComponent);

  let spectator: Spectator<PostHeaderComponent>;
  let component: PostHeaderComponent;

  beforeEach(() => {
    spectator = createComponent({
      props: {
        route: createPost(),
      },
    });
    component = spectator.component;
  });

  it('should be created', () => {
    expect(spectator.component).toBeTruthy();
  });
});
