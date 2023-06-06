import { Component, Inject } from '@angular/core';
import { ENVIRONMENT_TOKEN } from '../shared/di.tokens';
import { Environment } from '../../environments/environment.model';
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faStackOverflow,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface SocialMediaEntry {
  name: string;
  icon: IconDefinition;
  link: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  social: SocialMediaEntry[];

  constructor(@Inject(ENVIRONMENT_TOKEN) public environment: Environment) {
    this.social = [
      {
        name: 'Facebook',
        icon: faFacebook,
        link: environment.social.facebook,
      },
      {
        name: 'Twitter',
        icon: faTwitter,
        link: environment.social.twitter,
      },
      {
        name: 'LinkedIn',
        icon: faLinkedin,
        link: environment.social.linkedin,
      },
      {
        name: 'Stackoverflow',
        icon: faStackOverflow,
        link: environment.social.stackoverflow,
      },
      {
        name: 'Github',
        icon: faGithub,
        link: environment.social.github,
      },
    ];
  }
}
