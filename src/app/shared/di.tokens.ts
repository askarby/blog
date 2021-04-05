import { InjectionToken } from '@angular/core';

/**
 * Token for acquiring the Environment.
 *
 * Use this instead of "static access", to be able to mock it.
 */
export const ENVIRONMENT_TOKEN = new InjectionToken<string>('Environment');
