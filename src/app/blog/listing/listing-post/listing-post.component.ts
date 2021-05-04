import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-listing-post',
  templateUrl: './listing-post.component.html',
  styleUrls: ['./listing-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingPostComponent {
  @Input()
  set post(post: Post) {
    this.reference = post;
    this.deriveInfo(post);
  }

  get post(): Post {
    return this.reference;
  }

  hasTags: boolean;
  private reference!: Post;

  constructor() {
    this.hasTags = false;
  }

  private deriveInfo(post: Post): void {
    this.hasTags = (post.tags ?? []).length > 0;
  }
}
