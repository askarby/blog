import { Environment } from './environment.model';
import { sharedEnvironment } from './_environment.shared';

export const environment: Environment = {
  ...sharedEnvironment,
  production: true,
};
