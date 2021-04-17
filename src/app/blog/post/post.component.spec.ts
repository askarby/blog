import {
  createRoutingFactory,
  createSpyObject,
  SpectatorRouting,
} from '@ngneat/spectator/jest';

import { PostComponent } from './post.component';
import { MockComponents } from 'ng-mocks';
import {
  ScullyContentComponent,
  ScullyRoute,
  ScullyRoutesService,
} from '@scullyio/ng-lib';
import { Observable, Subject } from 'rxjs';
import { PostFooterComponent } from './post-footer/post-footer.component';
import { PostHeaderComponent } from './post-header/post-header.component';
import { TableOfContentsComponent } from './table-of-contents/table-of-contents.component';
import { createPostAsScullyRoute } from '../../testing/post.test-utils';

describe('PostComponent', () => {
  const currentRoute = new Subject<ScullyRoute>();
  const createComponent = createRoutingFactory({
    component: PostComponent,
    declarations: [
      MockComponents(
        ScullyContentComponent,
        PostFooterComponent,
        PostHeaderComponent,
        TableOfContentsComponent
      ),
    ],
    providers: [
      {
        provide: ScullyRoutesService,
        useValue: createSpyObject(ScullyRoutesService, {
          getCurrent: (): Observable<ScullyRoute> =>
            currentRoute.asObservable(),
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

  describe('with present route / post', () => {
    beforeEach(() => {
      currentRoute.next(createPostAsScullyRoute());
      spectator.detectChanges();
    });

    it('should display post header', () => {
      const header = spectator.query(PostHeaderComponent);
      expect(header).not.toBeNull();
    });

    it('should display table of contents', () => {
      const tableOfContents = spectator.query(TableOfContentsComponent);
      expect(tableOfContents).not.toBeNull();
    });

    it('should display scully projected content', () => {
      const scullyContent = spectator.query(ScullyContentComponent);
      expect(scullyContent).not.toBeNull();
    });

    it('should display post footer', () => {
      const footer = spectator.query(PostFooterComponent);
      expect(footer).not.toBeNull();
    });
  });

  describe('with absent route / post', () => {
    beforeEach(() => {
      spectator.detectChanges();
    });

    it('should display that blog post cannot be found', () => {
      ['article.not-found h1', 'article.not-found p'].forEach((required) => {
        expect(spectator.query(required)).not.toBeNull();
      });
    });

    it('should not display post header', () => {
      const header = spectator.query(PostHeaderComponent);
      expect(header).toBeNull();
    });

    it('should not display table of contents', () => {
      const tableOfContents = spectator.query(TableOfContentsComponent);
      expect(tableOfContents).toBeNull();
    });

    it('should not display scully projected content', () => {
      const scullyContent = spectator.query(ScullyContentComponent);
      expect(scullyContent).toBeNull();
    });

    it('should not display post footer', () => {
      const footer = spectator.query(PostFooterComponent);
      expect(footer).toBeNull();
    });
  });
});
