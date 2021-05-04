import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ListingByMonthAndYearComponent } from './listing-by-month-and-year.component';
import { MockComponents, MockPipe } from 'ng-mocks';
import { ListingPostComponent } from '../listing-post/listing-post.component';
import { createGroupedPostsByYearAndMonth } from '../../../testing/group.test-utils';
import { GroupedPostsByYearAndMonth } from '../../../models/grouped-posts.model';
import { MonthNamePipe } from '../../../shared/pipes/month-name.pipe';
import { Post } from '../../../models/post.model';

describe('ListingByMonthAndYearHeaderComponent', () => {
  const createComponent = createComponentFactory({
    component: ListingByMonthAndYearComponent,
    declarations: [
      MockComponents(ListingPostComponent),
      MockPipe(MonthNamePipe, (monthNumber) => `month:${monthNumber}`),
    ],
  });

  let spectator: Spectator<ListingByMonthAndYearComponent>;
  let component: ListingByMonthAndYearComponent;
  let group: GroupedPostsByYearAndMonth;
  let posts: Post[];

  beforeEach(() => {
    group = createGroupedPostsByYearAndMonth({
      year: 2021,
      distribution: {
        jan: 12,
        feb: 5,
        apr: 3,
      },
    });
    posts = group.subgroups.map((each) => each.posts).flat();

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

  describe('subgroups', () => {
    it('should create a section per subgroup', () => {
      const sections = spectator.queryAll('section');
      expect(sections).toHaveLength(group.subgroups.length);
    });

    it('should display the month name as a heading (within the section)', () => {
      const headings = spectator.queryAll('section h2');
      expect(headings).toContainText(['month:0', 'month:1', 'month:3']);
    });

    describe('post listing', () => {
      let listings: ListingPostComponent[];

      beforeEach(() => {
        listings = spectator.queryAll(ListingPostComponent);
      });

      it('should create a app-listing-post per post (grouped)', () => {
        expect(listings).toHaveLength(20);
      });

      it('should be passed a Post as input', () => {
        listings.forEach((listing) => {
          expect(listing.post).toBeAnyOf(posts);
        });
      });
    });
  });
});
