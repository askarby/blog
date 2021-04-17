import { InjectionToken } from '@angular/core';
import { Environment } from '../../environments/environment.model';

/**
 * Token for acquiring the Environment.
 *
 * Use this instead of "static access", to be able to mock it.
 */
export const ENVIRONMENT_TOKEN = new InjectionToken<Environment>('Environment');

export const WINDOW_TOKEN = new InjectionToken<Window>('Browser Window');

export const DOCUMENT_TOKEN = new InjectionToken<Document>('Browser Document');
