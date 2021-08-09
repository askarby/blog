import { Reference } from '../models/reference.model';

export const createReferenceItem = (
  seed: Partial<Reference> = {}
): Reference => ({
  name: 'Angular Blog on v.12 being available',
  url: 'https://blog.angular.io/angular-v12-is-now-available-32ed51fbfd49',
  ...seed,
});
