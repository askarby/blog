import {
  ExternalLink,
  InternalLink,
} from '../app/shared/shell/navigation.model';

export interface Environment {
  production: boolean;

  site: {
    name: string;
  };

  links: (InternalLink | ExternalLink)[];

  social: SocialMedia;
  email: string;
  websites: Websites;
}

export interface SocialMedia {
  facebook: string;
  twitter: string;
  linkedin: string;
  stackoverflow: string;
  github: string;
}

export interface Websites {
  blog: string;
  own: string;
  innotech: string;
}
