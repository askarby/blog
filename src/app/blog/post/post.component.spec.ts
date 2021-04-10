import {
  createRoutingFactory,
  mockProvider,
  SpectatorRouting,
} from '@ngneat/spectator/jest';

import { PostComponent } from './post.component';
import { MockComponents } from 'ng-mocks';
import { ScullyContentComponent, ScullyRoutesService } from '@scullyio/ng-lib';
import { EMPTY } from 'rxjs';
import { PostFooterComponent } from './post-footer/post-footer.component';
import { PostHeaderComponent } from './post-header/post-header.component';

describe('PostComponent', () => {
  const createComponent = createRoutingFactory({
    component: PostComponent,
    declarations: [
      MockComponents(
        ScullyContentComponent,
        PostFooterComponent,
        PostHeaderComponent
      ),
    ],
    providers: [
      mockProvider(ScullyRoutesService, {
        available$: EMPTY,
      }),
    ],
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
