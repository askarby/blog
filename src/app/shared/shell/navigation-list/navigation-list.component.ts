import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
} from '@angular/core';
import { ExternalLink, InternalLink } from '../navigation.model';
import { WINDOW_TOKEN } from '../../di.tokens';

@Component({
  selector: 'app-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationListComponent {
  @Input()
  menuItems!: (InternalLink | ExternalLink)[];

  constructor(@Inject(WINDOW_TOKEN) private window: Window) {}

  scrollToTop(): void {
    this.window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
