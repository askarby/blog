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

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  social = [
    {
      name: 'Facebook',
      icon: faFacebook,
      link: this.environment.social.facebook,
    },
    {
      name: 'Twitter',
      icon: faTwitter,
      link: this.environment.social.twitter,
    },
    {
      name: 'LinkedIn',
      icon: faLinkedin,
      link: this.environment.social.linkedin,
    },
    {
      name: 'Stackoverflow',
      icon: faStackOverflow,
      link: this.environment.social.stackoverflow,
    },
    {
      name: 'Github',
      icon: faGithub,
      link: this.environment.social.github,
    },
  ];

  constructor(@Inject(ENVIRONMENT_TOKEN) public environment: Environment) {}
}
