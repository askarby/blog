import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { PostFooterComponent } from './post-footer.component';
import { createPost } from '../../../testing/post.test-utils';
import { MockComponents } from 'ng-mocks';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Post } from '../../../models/post.model';
import { FeedbackButtonComponent } from './feedback-button/feedback-button.component';
import { createEnvironment } from '../../../testing/environment.test-utils';
import { Feedback } from '../../../../environments/environment.model';

describe('PostFooterComponent', () => {
  const createComponent = createComponentFactory({
    component: PostFooterComponent,
    declarations: [MockComponents(FeedbackButtonComponent, FaIconComponent)],
  });

  let spectator: Spectator<PostFooterComponent>;
  let component: PostFooterComponent;

  let post: Post;
  let feedback: Feedback;

  beforeEach(() => {
    post = createPost();
    feedback = createEnvironment().feedback;
    spectator = createComponent({
      props: {
        feedback,
        post,
      },
    });
    component = spectator.component;
  });

  it('should be created', () => {
    expect(spectator.component).toBeTruthy();
  });
});
