import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import {
  faHamburger,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { Environment } from '../../../../environments/environment.model';
import { ENVIRONMENT_TOKEN } from '../../di.tokens';
import { ExternalLink, InternalLink } from '../navigation.model';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent {
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
