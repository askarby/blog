import {
  createComponentFactory,
  Spectator,
  SpyObject,
} from '@ngneat/spectator/jest';

import { PostFooterComponent } from './post-footer.component';
import { createPost } from '../../../testing/post.test-utils';
import { DOCUMENT_TOKEN, WINDOW_TOKEN } from '../../../shared/di.tokens';
import { MockComponents } from 'ng-mocks';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Post } from '../../../models/post.model';
import { createSpyObj } from 'jest-createspyobj';

describe('PostFooterComponent', () => {
  const createComponent = createComponentFactory({
    component: PostFooterComponent,
    declarations: [MockComponents(FaIconComponent)],
    providers: [
      {
        provide: WINDOW_TOKEN,
        useFactory: () => createSpyObj('Window', ['scrollTo']),
      },
      {
        provide: DOCUMENT_TOKEN,
        useFactory: () => ({
          body: {
            scrollHeight: 0,
          },
        }),
      },
    ],
  });

  let spectator: Spectator<PostFooterComponent>;
  let component: PostFooterComponent;

  let window: SpyObject<Window>;
  let document: SpyObject<Document>;
  let post: Post;

  beforeEach(() => {
    post = createPost();
    spectator = createComponent({
      props: {
        post,
      },
    });
    component = spectator.component;

    window = spectator.inject(WINDOW_TOKEN);
    document = spectator.inject(DOCUMENT_TOKEN);
  });

  it('should be created', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display title', () => {
    const title = spectator.query('.title');
    expect(title).toHaveText(post.title);
  });

  it('should display a progress indicator', () => {
    const progress = spectator.query('.progress');
    expect(progress).not.toBeNull();
  });

  describe('navigation (to top)', () => {
    it('should display link that will scroll to the top of page', () => {
      expect(spectator.query('nav')).not.toBeNull();
    });

    it('should scroll to the top of page, when link is clicked', () => {
      spectator.click('nav');
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });
  });
});
