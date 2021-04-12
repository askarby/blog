import {
  createRoutingFactory,
  createSpyObject,
  mockProvider,
  SpectatorRouting,
} from '@ngneat/spectator/jest';

import { PostComponent } from './post.component';
import { MockComponents } from 'ng-mocks';
import {
  ScullyContentComponent,
  ScullyRoute,
  ScullyRoutesService,
} from '@scullyio/ng-lib';
import { EMPTY, Observable, of } from 'rxjs';
import { PostFooterComponent } from './post-footer/post-footer.component';
import { PostHeaderComponent } from './post-header/post-header.component';
import { createPostAsScullyRoute } from '../../testing/post.test-utils';

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
      {
        provide: ScullyRoutesService,
        useValue: createSpyObject(ScullyRoutesService, {
          getCurrent: (): Observable<ScullyRoute> =>
            of(createPostAsScullyRoute()),
        }),
      },
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
