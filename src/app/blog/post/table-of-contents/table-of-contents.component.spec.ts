import {
  Spectator,
  createComponentFactory,
  createSpyObject,
  SpyObject,
} from '@ngneat/spectator/jest';

import { TableOfContentsComponent } from './table-of-contents.component';
import { createPost } from '../../../testing/post.test-utils';
import { Post, TocEntry } from '../../../models/post.model';
import { DOCUMENT_TOKEN, WINDOW_TOKEN } from '../../../shared/di.tokens';

describe('TableOfContentsComponent', () => {
  const createComponent = createComponentFactory({
    component: TableOfContentsComponent,
    providers: [
      {
        provide: WINDOW_TOKEN,
        useValue: createSpyObject(Window, {
          scrollTo: jest.fn(),
        }),
      },
      {
        provide: DOCUMENT_TOKEN,
        useValue: createSpyObject(Document),
      },
    ],
  });

  let spectator: Spectator<TableOfContentsComponent>;
  let component: TableOfContentsComponent;

  const post: Readonly<Post> = createPost();

  let window: SpyObject<Window>;
  let document: SpyObject<Document>;

  beforeEach(() => {
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

  describe('title entry', () => {
    let titleAnchor: Element;

    beforeEach(() => {
      titleAnchor = spectator.queryAll('a')[0];
    });

    it('should render an anchor for title of post', () => {
      expect(titleAnchor.textContent).toEqual(post.title);
    });

    it('should navigate to top of window, when clicked upon', () => {
      const targetOffset = 123;
      document.getElementById.mockReturnValue({
        offsetTop: targetOffset,
      } as HTMLElement);

      spectator.click(titleAnchor);

      const expectedOffset =
        targetOffset - TableOfContentsComponent.navigationBarOffset;
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: expectedOffset,
        behavior: 'smooth',
      });
    });
  });

  describe('entries from TOC', () => {
    it('should render an anchor per entry', () => {
      const anchors = spectator.queryAll('a');
      // Expect with "+ 1", since title adds an anchor
      expect(anchors.length).toBe((post.toc ?? []).length + 1);
    });

    post.toc?.forEach((entry) => {
      let anchor: Element | undefined;

      beforeEach(() => {
        anchor = findAnchorForEntry(entry);
      });

      it(`should render an anchor per with title of TOC entry (title: "${entry.text}")`, () => {
        expect(anchor).toBeDefined();
      });

      it('should navigate to Element position, when clicked upon', () => {
        const targetOffset = 123;
        document.getElementById.mockReturnValue({
          offsetTop: targetOffset,
        } as HTMLElement);

        spectator.click(anchor);

        const expectedOffset =
          targetOffset - TableOfContentsComponent.navigationBarOffset;
        expect(window.scrollTo).toHaveBeenCalledWith({
          top: expectedOffset,
          behavior: 'smooth',
        });
      });
    });

    const findAnchorForEntry = (entry: TocEntry): Element | undefined => {
      const anchors = spectator.queryAll('a');
      return anchors.find(
        (anchor) => (anchor.textContent ?? '').trim() === entry.text
      );
    };
  });
});
