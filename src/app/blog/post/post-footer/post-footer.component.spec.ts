import {
  createComponentFactory,
  createSpyObject,
  Spectator,
} from '@ngneat/spectator/jest';

import { PostFooterComponent } from './post-footer.component';
import { createPost } from '../../../testing/post.test-utils';
import { DOCUMENT_TOKEN, WINDOW_TOKEN } from '../../../shared/di.tokens';
import { MockComponents } from 'ng-mocks';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

describe('PostFooterComponent', () => {
  const createComponent = createComponentFactory({
    component: PostFooterComponent,
    declarations: [MockComponents(FaIconComponent)],
    providers: [
      {
        provide: WINDOW_TOKEN,
        useValue: createSpyObject(Window),
      },
      {
        provide: DOCUMENT_TOKEN,
        useValue: createSpyObject(Document),
      },
    ],
  });

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
