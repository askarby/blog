import { createRoutingFactory, Spectator } from '@ngneat/spectator/jest';

import { NewPostsComponent } from './new-posts.component';

describe('NewPostsComponent', () => {
  const createComponent = createRoutingFactory({
    component: NewPostsComponent,
    mockRouterLinks: true,
  });
  let spectator: Spectator<NewPostsComponent>;
  let component: NewPostsComponent;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
