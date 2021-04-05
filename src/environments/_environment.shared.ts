import { Environment } from './environment.model';

export const sharedEnvironment: Omit<Environment, 'production'> = {
  site: {
    name: 'skarby.info',
  },

  links: [
    {
      type: 'internal',
      title: 'Blog',
      theme: 'blog',
      urlTree: ['blog'],
    },
    {
      type: 'external',
      title: 'Presentations',
      theme: 'presentations',
      url: 'https://presentations.skarby.info',
    },
    {
      type: 'internal',
      title: 'About',
      theme: 'about',
      urlTree: ['about'],
    },
  ],

    social: {
    facebook: 'https://www.facebook.com/askarby/',
      twitter: 'https://twitter.com/askarby',
      linkedin: 'https://www.linkedin.com/in/askarby/',
      stackoverflow: 'https://stackoverflow.com/users/1016516/anders',
      github: 'https://github.com/askarby',
  },
}
