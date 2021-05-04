import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { groupPosts } from '../operators/group-posts.operator';
import { mapToPosts } from '../operators/map-to-post.operator';
import { GroupedPosts } from '../../models/grouped-posts.model';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingComponent {
  grouped$!: Observable<GroupedPosts[]>;
  focusedPost: Post | null = null;

  constructor(private scully: ScullyRoutesService) {
    this.grouped$ = scully.available$.pipe(mapToPosts(), groupPosts());
  }
}
