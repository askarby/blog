import { ExternalLink, InternalLink } from '../shared/shell/navigation.model';

export const createInternalLink = (
  seed: Omit<Partial<InternalLink>, 'type'> = {}
): InternalLink => ({
  type: 'internal',
  theme: 'theme',
  title: 'Home',
  urlTree: ['/'],
  ...seed,
});

export const createExternalLink = (
  seed: Omit<Partial<ExternalLink>, 'type'> = {}
): ExternalLink => ({
  type: 'external',
  theme: 'theme',
  title: 'Google',
  url: 'https://google.com',
  ...seed,
});
