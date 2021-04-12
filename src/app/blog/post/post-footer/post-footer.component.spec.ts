import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { PostFooterComponent } from './post-footer.component';
import { createPost } from '../../../testing/post.test-utils';

describe('PostFooterComponent', () => {
  const createComponent = createComponentFactory(PostFooterComponent);

  let spectator: Spectator<PostFooterComponent>;
  let component: PostFooterComponent;

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
