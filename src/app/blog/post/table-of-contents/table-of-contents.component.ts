import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
} from '@angular/core';
import { Post, TocEntry } from '../../../models/post.model';
import { DOCUMENT_TOKEN, WINDOW_TOKEN } from '../../../shared/di.tokens';

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOfContentsComponent {
  static readonly navigationBarOffset = 100;

  @Input()
  post!: Post;

  @Input()
  titleId!: string;

  constructor(
    @Inject(WINDOW_TOKEN) private window: Window,
    @Inject(DOCUMENT_TOKEN) private document: Document
  ) {}

  scrollToTitle(): void {
    const entry = { id: this.titleId } as TocEntry;
    this.scrollTo(entry);
  }

  scrollTo(entry: TocEntry): void {
    const element = this.document.getElementById(entry.id);
    if (element) {
      const top =
        element.offsetTop - TableOfContentsComponent.navigationBarOffset;
      this.window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  }
}
