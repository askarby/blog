import { createRoutingFactory, mockProvider, SpectatorRouting } from '@ngneat/spectator/jest';

import { PostComponent } from './post.component';
import { MockComponents } from 'ng-mocks';
import { ScullyContentComponent, ScullyRoutesService } from '@scullyio/ng-lib';
import { EMPTY } from 'rxjs';

describe('PostComponent', () => {
  const createComponent = createRoutingFactory({
    component: PostComponent,
    declarations: [MockComponents(ScullyContentComponent)],
    providers: [
      mockProvider(ScullyRoutesService, {
        available$: EMPTY,
      })
    ]
  });
  let spectator: SpectatorRouting<PostComponent>;
  let component: PostComponent;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
