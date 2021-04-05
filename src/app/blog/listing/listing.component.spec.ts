import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator/jest';

import { ListingComponent } from './listing.component';

describe('ListingComponent', () => {
  const createComponent = createRoutingFactory({
    component: ListingComponent,
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
