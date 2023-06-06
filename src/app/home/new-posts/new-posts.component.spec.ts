import { createRoutingFactory, Spectator } from '@ngneat/spectator/jest';

import { NewPostsComponent } from './new-posts.component';
import { Post } from '../../models/post.model';
import { createPosts } from '../../testing/post.test-utils';

describe('NewPostsComponent', () => {
  const createComponent = createRoutingFactory({
    component: NewPostsComponent,
  });
  let spectator: Spectator<NewPostsComponent>;
  let component: NewPostsComponent;

  let posts: Post[];

  beforeEach(() => {
    posts = createPosts({ year: 2021, monthName: 'june', noOfPosts: 3 });

    spectator = createComponent({
      props: {
        posts,
        timeBetween: 5000,
      },
    });
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('thumbnails', () => {
    it('should render a thumbnail for each post', () => {
      const listings = spectator.queryAll('ul li');
      expect(listings.length).toEqual(posts.length);
    });

    it('should highlight thumbnail, for currently active post', () => {
      const selectorFor2ndThumbnail = 'ul li:nth-child(1)';
      spectator.click(selectorFor2ndThumbnail);
      const selectedListItem = spectator.query(selectorFor2ndThumbnail);
      expect(selectedListItem).toHaveClass('selected');
    });

    it('should not highlight thumbnail, for currently non-active posts', () => {
      const selectorFor2ndThumbnail = 'ul li:nth-child(1)';
      spectator.click(selectorFor2ndThumbnail);

      const selectorForOtherThumbnails = 'ul :not(li:nth-child(1))';
      const nonSelectedListItems = spectator.queryAll(
        selectorForOtherThumbnails
      );
      nonSelectedListItems.forEach((each) => {
        expect(each).not.toHaveClass('selected');
      });
    });
  });

  describe('post presentation', () => {
    beforeEach(() => {
      expect(component.currentPost).toBeDefined();
    });

    it('should display image, for currently active post', () => {
      const image = spectator.query('article img') as HTMLImageElement;
      expect(image).not.toBeNull();
      // TODO: Figure out why the image src is prefixed with "https://github.com"
      expect(image.src).toContain(posts[0].image);
    });

    it('should display title, for currently active post', () => {
      const heading = spectator.query('article .info h1');
      expect(heading).toHaveText(component.currentPost?.title as string);
    });

    it('should display description, for currently active post', () => {
      const paragraph = spectator.query('article .info p');
      expect(paragraph).toHaveText(
        component.currentPost?.description as string
      );
    });
  });

  describe('slideshow', () => {
    beforeEach(() => {
      expect(component.currentPost).toBeDefined();
    });

    it('should default have first post selected / activated', () => {
      expect(getNthItem(0)).toHaveClass('selected');
    });

    it('should immediately show to post, when thumbnail is clicked upon', () => {
      expect(getNthItem(0)).toHaveClass('selected');

      spectator.click('ul li:nth-child(1)');

      expect(getNthItem(1)).toHaveClass('selected');
    });
  });

  const getNthItem = (index: number) => {
    const selector =
      index > 0 ? `ul li:nth-child(${index})` : 'ul li:first-child';
    return spectator.query(selector) as HTMLUListElement;
  };
});
