import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Post } from '../../models/post.model';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-posts',
  templateUrl: './new-posts.component.html',
  styleUrls: ['./new-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPostsComponent implements OnChanges, OnDestroy {
  @Input()
  posts!: Post[] | null;

  @Input()
  timeBetween!: number;

  currentPost: Post | null = null;

  private destroy$ = new Subject();

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { posts } = changes;
    if (posts?.currentValue) {
      this.currentPost = posts.currentValue[0];
      this.startTimer();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  startTimer() {
    // Stop currently running timer (if none is running, this has no effect)
    this.destroy$.next();

    // Start a new interval timer
    interval(this.timeBetween)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.selectNextPost());
  }

  private selectNextPost() {
    if (this.posts) {
      const index = this.currentPost
        ? this.posts.indexOf(this.currentPost)
        : -1;
      let nextIndex = index + 1;
      if (nextIndex >= this.posts.length) {
        nextIndex = 0;
      }
      this.currentPost = this.posts[nextIndex];

      // Since this component is configured with "OnPush"-change detection,
      // we need to manually trigger change detection here!
      this.changeDetector.detectChanges();
    }
  }
}
