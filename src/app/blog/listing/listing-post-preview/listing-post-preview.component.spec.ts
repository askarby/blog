import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ListingPostPreviewComponent } from './listing-post-preview.component';
import { createPost } from '../../../testing/post.test-utils';
import { MockComponent } from 'ng-mocks';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Post } from '../../../models/post.model';
import { dateOfYear } from '../../../testing/date.test-utils';

describe('ListingPostPreviewComponent', () => {
  const createComponent = createComponentFactory({
    component: ListingPostPreviewComponent,
    declarations: [MockComponent(FaIconComponent)],
  });

  let spectator: Spectator<ListingPostPreviewComponent>;
  let component: ListingPostPreviewComponent;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('with selection', () => {
    let post: Post;

    beforeEach(() => {
      post = createPost({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        published_date: dateOfYear(2021)
          .withDay(4)
          .withMonth('apr')
          .withoutTime()
          .build(),
      });
      spectator.setInput({ post });
    });

    it('should display title', () => {
      const heading = spectator.query('h1');
      expect(heading).toHaveText(post.title);
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

  describe('without selection', () => {
    beforeEach(() => {
      spectator.setInput({ post: null });
    });

    it('should display placeholder', () => {
      expect(spectator.query('h1')).toHaveText('Preview');

      const image = spectator.query('img') as HTMLImageElement;
      expect(image.alt).toEqual('Preview');
      expect(image.src).toContain('/assets/images/mouse-hover.svg');

      expect(spectator.queryAll('p')).not.toBeEmpty();
    });
  });
});
