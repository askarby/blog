import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { ListingByYearComponent } from './listing-by-year.component';
import { MockComponents } from 'ng-mocks';
import { ListingPostComponent } from '../listing-post/listing-post.component';
import { createGroupedPostsByYear } from '../../../testing/group.test-utils';
import { GroupedPostsByYear } from '../../../models/grouped-posts.model';

describe('ListingByYearHeaderComponent', () => {
  const createComponent = createComponentFactory({
    component: ListingByYearComponent,
    declarations: [MockComponents(ListingPostComponent)],
  });

  let spectator: Spectator<ListingByYearComponent>;
  let component: ListingByYearComponent;
  let group: GroupedPostsByYear;

  beforeEach(() => {
    group = createGroupedPostsByYear({
      year: 2021,
      distribution: {
        jan: 12,
        apr: 5,
        oct: 9,
      },
    });
    spectator = createComponent({
      props: {
        group,
      },
    });
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display year of listing in header', () => {
    const heading = spectator.query('header h1');
    expect(heading).toContainText(group.year.toString());
  });

  describe('post listing', () => {
    let listings: ListingPostComponent[];

    beforeEach(() => {
      listings = spectator.queryAll(ListingPostComponent);
    });

    it('should create a app-listing-post per post (grouped)', () => {
      expect(listings).toHaveLength(26);
    });

    it('should be passed a Post as input', () => {
      listings.forEach((listing) => {
        expect(listing.post).toBeAnyOf(group.posts);
      });
    });
  });
});
