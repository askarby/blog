import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { PostHeaderComponent } from './post-header.component';
import { MockComponents } from 'ng-mocks';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { createPost } from '../../../testing/post.test-utils';
import { Post } from '../../../models/post.model';
import { dateOfYear } from '../../../testing/date.test-utils';

describe('PostHeaderComponent', () => {
  const createComponent = createComponentFactory({
    component: PostHeaderComponent,
    declarations: [MockComponents(FaIconComponent)],
  });

  let spectator: Spectator<PostHeaderComponent>;
  let component: PostHeaderComponent;

  let titleId: string;
  let post: Post;

  beforeEach(() => {
    titleId = 'id';
    post = createPost({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      published_date: dateOfYear(2021)
        .withDay(4)
        .withMonth('apr')
        .withoutTime()
        .build(),
    });

    spectator = createComponent({
      props: {
        post,
        titleId,
      },
    });
    component = spectator.component;
  });

  it('should be created', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('title', () => {
    it('should be displayed', () => {
      const heading = spectator.query('h1');
      expect(heading).toHaveText(post.title);
    });

    it('should have provided id', () => {
      const heading = spectator.query('h1');
      expect(heading?.id).toEqual(titleId);
    });
  });

  it('should display released date', () => {
    const released = spectator.query('.released');
    expect(released).toHaveText('April 4, 2021');
  });

  it('should display reading time', () => {
    const readTime = spectator.query('.read-time');
    expect(readTime).toHaveText(post.readingTime.toString() + ' min to read');
  });

  it('should display description', () => {
    const description = spectator.query('.description');
    expect(description).toHaveText(post.description);
  });

  describe('image', () => {
    it('should be displayed', () => {
      const image = spectator.query('img') as HTMLImageElement;
      expect(image.src).toContain(post.image);
    });

    it('should have title as alt-text', () => {
      const image = spectator.query('img') as HTMLImageElement;
      expect(image.alt).toEqual(post.title);
    });
  });
});
