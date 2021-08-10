import { HomeComponent } from './home.component';
import {
  createRoutingFactory,
  mockProvider,
  SpectatorRouting,
} from '@ngneat/spectator/jest';
import { MockComponents } from 'ng-mocks';
import { NewPostsComponent } from './new-posts/new-posts.component';
import { ENVIRONMENT_TOKEN } from '../shared/di.tokens';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { createEnvironment } from '../testing/environment.test-utils';
import { createPostAsScullyRoute } from '../testing/post.test-utils';
import { of } from 'rxjs';
import { dateOfYear } from '../testing/date.test-utils';
import { Environment } from '../../environments/environment.model';
import { LicenseRepositoryService } from '../shared/services/license-repository.service';

describe('HomeComponent', () => {
  const createComponent = createRoutingFactory({
    component: HomeComponent,
    declarations: [MockComponents(NewPostsComponent)],
    mocks: [LicenseRepositoryService],
    providers: [
      mockProvider(ScullyRoutesService, {
        available$: of(
          ['march', 'january', 'august', 'february']
            .map((monthName) => ({
              date: dateOfYear(2021)
                .withMonth(monthName)
                .withDay(1)
                .withoutTime()
                .build(),
              monthName,
            }))
            .map(({ date, monthName }) =>
              createPostAsScullyRoute({
                // eslint-disable-next-line @typescript-eslint/naming-convention
                published_date: date,
                title: monthName,
              })
            )
        ),
      }),
      {
        provide: ENVIRONMENT_TOKEN,
        useValue: createEnvironment({
          frontPage: {
            numberOfNewestPosts: 3,
            timeBetweenPostChange: 5000,
          },
        }),
      },
    ],
  });

  let spectator: SpectatorRouting<HomeComponent>;
  let component: HomeComponent;

  let environment: Environment;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    environment = spectator.inject(ENVIRONMENT_TOKEN);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('newestPosts$', () => {
    it('should contain newest posts (count determined by environment)', (done) => {
      component.newestPosts$.subscribe((posts) => {
        expect(posts).toHaveLength(environment.frontPage.numberOfNewestPosts);
        expect(posts[0].title).toEqual('august');
        expect(posts[1].title).toEqual('march');
        expect(posts[2].title).toEqual('february');
        done();
      });
    });
  });

  describe('newest posts', () => {
    let newPostsComponent: NewPostsComponent | null;

    beforeEach(() => {
      newPostsComponent = spectator.query(NewPostsComponent);
    });

    it('should be rendered using the app-new-posts component', () => {
      expect(newPostsComponent).not.toBeNull();
    });

    it('should bind the newest posts to the "posts"-input of component', (done) => {
      component.newestPosts$.subscribe((posts) => {
        expect(newPostsComponent?.posts).toEqual(posts);
        done();
      });
    });
  });

  describe('about section', () => {
    it('should display an "about"-section', () => {
      expect(spectator.query('section.about-the-blog')).not.toBeNull();
    });
  });
});
