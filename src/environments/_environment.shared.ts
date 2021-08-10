import { Environment } from './environment.model';

export const sharedEnvironment: Omit<Environment, 'production' | 'analytics'> =
  {
    site: {
      name: 'skarby.info',
      githubRepo: 'https://github.com/askarby/blog',
    },

    feedback: {
      content:
        'https://github.com/askarby/blog/issues/new?labels=content%2Cfeedback&template=content-bug.yaml&title=%5BFeedback%5D%3A+',
      bug: 'https://github.com/askarby/blog/issues/new?labels=bug%2Ctriage&template=software-bug.yaml&title=%5BBug%5D%3A+',
      issues: 'https://github.com/askarby/blog/issues',
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
    email: 'anders@skarby.info',
    websites: {
      blog: 'https://blog.skarby.info',
      own: 'https://skarby.info',
      company: 'https://inno-tech.dk',
    },

    globalLicenses: [
      {
        forItem: 'icons',
        from: 'fontawesome',
        url: 'https://fontawesome.com/icons?d=gallery&p=2&m=free',
      },
    ],

    frontPage: {
      numberOfNewestPosts: 3,
      timeBetweenPostChange: 5000,
    },
  };
