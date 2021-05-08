import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../../../models/post.model';
import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-listing-post-preview',
  templateUrl: './listing-post-preview.component.html',
  styleUrls: ['./listing-post-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingPostPreviewComponent {
  @Input()
  post!: Post | null;

  icons = {
    released: faCalendarAlt,
    readTime: faClock,
  };
}
