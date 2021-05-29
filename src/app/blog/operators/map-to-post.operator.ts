import { Post } from '../../models/post.model';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

const routeToPost = (route: ScullyRoute): Post => {
  const post = {} as Post;
  post.tags = [];
  Object.entries(route).forEach(([key, value]) => {
    if (key === 'tags') {
      post.tags = value.split(' ');
    } else if (key === 'published_date') {
      post.published_date = new Date(value);
    } else if (key === 'image') {
      post.image = `/assets/${value}`;
    } else {
      post[key] = value;
    }
  });
  return post;
};

export const mapToPost = (): OperatorFunction<ScullyRoute, Post> => (
  input: Observable<ScullyRoute>
) => input.pipe(map(routeToPost));

export const mapToPosts = (): OperatorFunction<ScullyRoute[], Post[]> => (
  input: Observable<ScullyRoute[]>
) => input.pipe(map((routes) => routes.map(routeToPost)));
