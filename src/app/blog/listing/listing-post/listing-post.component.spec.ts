import {
  createRoutingFactory,
  SpectatorRouting,
  SpyObject,
} from '@ngneat/spectator/jest';

import { ListingPostComponent } from './listing-post.component';
import { createPost } from '../../../testing/post.test-utils';
import { Post } from '../../../models/post.model';
import { Router, RouterLink } from '@angular/router';
import { dateOfYear } from '../../../testing/date.test-utils';
import { MockDirectives } from 'ng-mocks';

describe('ListingPostComponent', () => {
  const createComponent = createRoutingFactory({
    component: ListingPostComponent,
    declarations: [MockDirectives(RouterLink)],
    stubsEnabled: true,
  });

  let spectator: SpectatorRouting<ListingPostComponent>;
  let component: ListingPostComponent;

  let post: Post;

  let router: SpyObject<Router>;

  beforeEach(() => {
    post = createPost({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      published_date: dateOfYear(2021)
        .withMonth('april')
        .withDay(2)
        .withoutTime()
        .build(),
    });
    spectator = createComponent({
      props: { post },
    });
    component = spectator.component;
    router = spectator.inject(Router);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title of the post', () => {
    const heading = spectator.query('h1');
    expect(heading).toContainText(post.title);
  });

  it('should navigate to post, when clicking upon title', () => {
    const anchor = spectator.query('a', { read: RouterLink }) as RouterLink;
    expect(anchor.routerLink).toEqual(post.route);
  });

  it('should display date of post', () => {
    const date = spectator.query('time');
    expect(date).toHaveText('April 2, 2021');
  });

  it('should display tags of post, when present', () => {
    const tags = spectator.queryAll('ul.tags li');
    expect(tags).toHaveLength(post.tags.length);
  });

  it('should not display tags of post, when absent', () => {
    const postWithoutTags = createPost({
      tags: [],
    });
    spectator.setInput('post', postWithoutTags);
    const tags = spectator.queryAll('ul.tags li');
    expect(tags).toHaveLength(0);
  });
});
