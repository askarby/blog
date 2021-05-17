import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SocialMedia } from '../../../../environments/environment.model';
import { LicenseItem } from '../../../models/license-info.model';
import { ExternalLink, InternalLink } from '../navigation.model';

@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageFooterComponent {
  @Input()
  socialMedia!: SocialMedia;

  @Input()
  menuItems!: (InternalLink | ExternalLink)[];

  @Input()
  licenseItems!: LicenseItem[] | null;
}
