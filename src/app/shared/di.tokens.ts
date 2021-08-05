import { InjectionToken } from '@angular/core';
import { Environment } from '../../environments/environment.model';

/**
 * Token for acquiring the Environment.
 *
 * Use this instead of "static access", to be able to mock it.
 */
export const ENVIRONMENT_TOKEN = new InjectionToken<Environment>('Environment');

/**
 * Token for acquiring the browser's `window` object.
 */
export const WINDOW_TOKEN = new InjectionToken<Window>('Browser Window');

/**
 * Token for acquiring the browser's `document` object (for the `window`).
 */
export const DOCUMENT_TOKEN = new InjectionToken<Document>('Browser Document');

/**
 * Token for acquiring the browser's `LocalStorage` object (for the `window`).
 */
export const LOCAL_STORAGE_TOKEN = new InjectionToken<Storage>(
  'Browser LocalStorage'
);

/**
 * Token for acquiring the browser's `SessionStorage` object (for the `window`).
 */
export const SESSION_STORAGE_TOKEN = new InjectionToken<Storage>(
  'Browser SessionStorage'
);
