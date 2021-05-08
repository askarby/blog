import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ListingPostPreviewComponent } from './listing-post-preview.component';
import { createPost } from '../../../testing/post.test-utils';
import { MockComponent } from 'ng-mocks';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

describe('ListingPostPreviewComponent', () => {
  const createComponent = createComponentFactory({
    component: ListingPostPreviewComponent,
    declarations: [MockComponent(FaIconComponent)],
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
