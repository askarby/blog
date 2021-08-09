import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from '@angular/core';
import {
  faCookieBite,
  faHamburger,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { ExternalLink, InternalLink } from '../navigation.model';
import { WINDOW_TOKEN } from '../../di.tokens';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarComponent {
  @Input()
  siteName!: string;

  @Input()
  menuItems!: (InternalLink | ExternalLink)[];

  @Input()
  displayCookieAccess!: boolean | null;

  @Output()
  showMenu: EventEmitter<void>;

  @Output()
  showCookiePreferences: EventEmitter<void>;

  icons = {
    menu: faHamburger,
    search: faSearch,
    close: faTimes,
    cookie: faCookieBite,
  };

  constructor(@Inject(WINDOW_TOKEN) private window: Window) {
    this.showMenu = new EventEmitter();
    this.showCookiePreferences = new EventEmitter();
  }

  scrollToTop(): void {
    this.window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
