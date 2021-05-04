import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ListingPostPreviewComponent } from './listing-post-preview.component';
import { createPost } from '../../../testing/post.test-utils';

describe('ListingPostPreviewComponent', () => {
  const createComponent = createComponentFactory({
    component: ListingPostPreviewComponent,
  });
  let spectator: Spectator<ListingPostPreviewComponent>;
  let component: ListingPostPreviewComponent;

  beforeEach(() => {
    spectator = createComponent({
      props: {
        post: createPost(),
      },
    });
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
