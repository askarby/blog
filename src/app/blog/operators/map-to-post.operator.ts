import { Post } from '../../models/post.model';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export const mapToPost = (): OperatorFunction<ScullyRoute, Post> => (
  input: Observable<ScullyRoute>
) =>
  input.pipe(
    map((route) => {
      const post = {} as Post;
      Object.entries(route).forEach(([key, value]) => {
        if (key === 'tags') {
          post.tags = value.split(' ');
        } else {
          post[key] = value;
        }
      });
      return post;
    })
  );
