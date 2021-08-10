import {
  ExternalLink,
  InternalLink,
} from '../app/shared/shell/navigation.model';
import { LicenseItem } from '../app/models/license-info.model';

export interface Environment {
  production: boolean;

  site: {
    name: string;
    githubRepo: string;
  };

  feedback: Feedback;

  links: (InternalLink | ExternalLink)[];

  social: SocialMedia;
  email: string;
  websites: Websites;

  globalLicenses: LicenseItem[];

  frontPage: FrontPage;

  analytics: Analytics;
}

export interface Feedback {
  content: string;
  bug: string;
  issues: string;
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
  company: string;
}

export interface FrontPage {
  numberOfNewestPosts: number;
  timeBetweenPostChange: number;
}

export interface Analytics {
  googleAnalyticsTrackingId: string;
}
