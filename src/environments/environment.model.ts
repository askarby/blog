import { ExternalLink, InternalLink } from '../app/shared/shell/navigation.model';

export interface Environment {
  production: boolean;

  site: {
    name: string;
  };

  links: (InternalLink | ExternalLink)[];

  social: {
    facebook: string;
    twitter: string;
    linkedin: string;
    stackoverflow: string;
    github: string;
  };
}
