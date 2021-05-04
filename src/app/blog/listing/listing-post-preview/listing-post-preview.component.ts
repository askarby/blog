import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-listing-post-preview',
  templateUrl: './listing-post-preview.component.html',
  styleUrls: ['./listing-post-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingPostPreviewComponent {
  @Input()
  post!: Post;
}
