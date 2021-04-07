import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  faHamburger,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { ExternalLink, InternalLink } from '../navigation.model';

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

  @Output()
  menuTriggerClicked: EventEmitter<void>;

  icons = {
    menu: faHamburger,
    search: faSearch,
    close: faTimes,
  };

  constructor() {
    this.menuTriggerClicked = new EventEmitter();
  }
}
