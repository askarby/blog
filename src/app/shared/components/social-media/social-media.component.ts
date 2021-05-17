import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SocialMedia } from '../../../../environments/environment.model';
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faStackOverflow,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialMediaComponent {
  @Input()
  socialMedia!: SocialMedia;

  icons = {
    facebook: faFacebook,
    twitter: faTwitter,
    linkedin: faLinkedin,
    stackoverflow: faStackOverflow,
    github: faGithub,
  };
}
