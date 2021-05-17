import { Environment, SocialMedia } from '../../environments/environment.model';
import { ExternalLink, InternalLink } from '../shared/shell/navigation.model';

export const createSocialMedia = (
  seed: Partial<SocialMedia> = {}
): SocialMedia => ({
  facebook: 'https://www.facebook.com/bob/',
  twitter: 'https://twitter.com/bob',
  linkedin: 'https://www.linkedin.com/in/bob/',
  stackoverflow: 'https://stackoverflow.com/users/1234567/bob',
  github: 'https://github.com/bob',
  ...seed,
});

export const createLinks = (): (InternalLink | ExternalLink)[] => [
  {
    type: 'internal',
    title: 'Blog',
    theme: 'blog',
    urlTree: ['blog'],
  },
  {
    type: 'external',
    title: 'Google',
    theme: 'external',
    url: 'https://google.com',
  },
];

export const createEnvironment = (
  seed: Partial<Environment> = {}
): Environment => ({
  production: true,

  site: {
    name: 'test.com',
  },

  links: createLinks(),

  social: createSocialMedia(),
  email: 'test@email.com',
  websites: {
    blog: 'https://blog.site.com',
    own: 'https://own.site.com',
    company: 'https://company.site.com',
  },

  globalLicenses: [
    {
      forItem: 'icons',
      from: 'fontawesome',
      url: 'https://fontawesome.com/icons?d=gallery&p=2&m=free',
    },
  ],

  ...seed,
});
