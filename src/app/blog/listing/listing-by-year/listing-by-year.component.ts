import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { GroupedPostsByYear } from '../../../models/grouped-posts.model';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-listing-by-year',
  templateUrl: './listing-by-year.component.html',
  styleUrls: ['./listing-by-year.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingByYearComponent {
  @Input()
  group!: GroupedPostsByYear;

  @Output()
  postFocus = new EventEmitter<Post | null>();
}
