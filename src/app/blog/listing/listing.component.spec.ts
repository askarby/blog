import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator/jest';

import { ListingComponent } from './listing.component';
import { MockComponents } from 'ng-mocks';
import { ListingByMonthAndYearComponent } from './listing-by-month-and-year/listing-by-month-and-year.component';
import { ListingByYearComponent } from './listing-by-year/listing-by-year.component';
import { ListingPostComponent } from './listing-post/listing-post.component';
import { ListingPostPreviewComponent } from './listing-post-preview/listing-post-preview.component';

describe('ListingComponent', () => {
  const createComponent = createRoutingFactory({
    component: ListingComponent,
    declarations: [
      MockComponents(
        ListingByMonthAndYearComponent,
        ListingByYearComponent,
        ListingPostComponent,
        ListingPostPreviewComponent
      ),
    ],
  });

  let spectator: SpectatorRouting<ListingComponent>;
  let component: ListingComponent;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
