import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ExternalLink, InternalLink } from '../navigation.model';

@Component({
  selector: 'app-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationListComponent {
  @Input()
  menuItems!: (InternalLink | ExternalLink)[];
}
