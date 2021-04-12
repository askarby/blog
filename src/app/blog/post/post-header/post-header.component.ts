import { Component, Input } from '@angular/core';
import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss'],
})
export class PostHeaderComponent {
  @Input()
  post!: Post;

  icons = {
    released: faCalendarAlt,
    readTime: faClock,
  };
}
