import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../../../models/post.model';
import {
  faBug,
  faComments,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { Feedback } from '../../../../environments/environment.model';

@Component({
  selector: 'app-post-footer',
  templateUrl: './post-footer.component.html',
  styleUrls: ['./post-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFooterComponent {
  @Input()
  post!: Post;

  @Input()
  feedback!: Feedback;

  icons = {
    info: faExclamationTriangle,
    bug: faBug,
    feedback: faComments,
  };
}
