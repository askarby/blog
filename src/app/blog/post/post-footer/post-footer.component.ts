import { Component, HostListener, Inject, Input } from '@angular/core';
import { Post } from '../../../models/post.model';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT_TOKEN, WINDOW_TOKEN } from '../../../shared/di.tokens';

@Component({
  selector: 'app-post-footer',
  templateUrl: './post-footer.component.html',
  styleUrls: ['./post-footer.component.scss'],
})
export class PostFooterComponent {
  @Input()
  post!: Post;

  percentageRemaining = 100;

  icons = {
    toTop: faAngleUp,
  };

  constructor(
    @Inject(WINDOW_TOKEN) private window: Window,
    @Inject(DOCUMENT_TOKEN) private document: Document
  ) {}

  @HostListener('window:scroll')
  scrolledTo(): void {
    this.percentageRemaining = this.calculatePercentageLeft();
  }

  scrollToTop(): void {
    this.window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  private calculatePercentageLeft(): number {
    const current = this.window.pageYOffset + this.window.innerHeight;
    const bottom = this.document.body.scrollHeight;
    const percentageRead = Math.min(Math.round((current / bottom) * 100), 100);
    return 100 - percentageRead;
  }
}
