// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from './environment.model';
import { sharedEnvironment } from './_environment.shared';

export const environment: Environment = {
  ...sharedEnvironment,
  production: false,
};
