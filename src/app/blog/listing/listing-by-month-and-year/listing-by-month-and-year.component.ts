import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { GroupedPostsByYearAndMonth } from '../../../models/grouped-posts.model';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-listing-by-month-and-year',
  templateUrl: './listing-by-month-and-year.component.html',
  styleUrls: ['./listing-by-month-and-year.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingByMonthAndYearComponent {
  @Input()
  group!: GroupedPostsByYearAndMonth;

  @Output()
  postFocus = new EventEmitter<Post | null>();
}
