import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { COOKIE_PROVIDERS } from './cookie-consent.module';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import {
  LOCAL_STORAGE_TOKEN,
  SESSION_STORAGE_TOKEN,
} from '../shared/di.tokens';
import { PersistedCookieSettings } from './persisted-cookie-settings.model';
import { booleanFromString } from '../shared/utilities/string-conversion.utility';
import { CookieImportance, CookieProvider } from './cookie-provider.model';
import {
  CookieEnablement,
  sortByImportanceAndName,
} from './cookie-enablement.model';

export const DEFAULT_SETTINGS_PROVIDER: Readonly<CookieProvider> = {
  id: 'DEFAULT_SETTINGS',
  importance: CookieImportance.default,
  name: 'Default settings',
  description: 'Essential settings, for having the application working',
};

export const BAILOUT_SESSION_KEY = '[CookieConsentService] BAILOUT_SESSION_KEY';
export const PERSISTED_COOKIE_SETTINGS_KEY =
  '[CookieConsentService] PERSISTED_COOKIE_SETTINGS_KEY';

@Injectable({
  providedIn: 'root',
})
export class CookieConsentService {
  private displayConsentBarStream$ = new ReplaySubject<boolean>(1);
  private displayConsentPreferencesStream$ = new BehaviorSubject<boolean>(
    false
  );
  private cookieEnablementsStream$ = new BehaviorSubject<CookieEnablement[]>(
    []
  );
  private state: Map<CookieProvider, boolean> = new Map();

  constructor(
    @Inject(COOKIE_PROVIDERS) cookieProviders: CookieProvider[][],
    @Inject(SESSION_STORAGE_TOKEN) private sessionStorage: Storage,
    @Inject(LOCAL_STORAGE_TOKEN) private localStorage: Storage
  ) {
    this.initialize(cookieProviders);
  }

  /**
   * Displays the consent bar.
   */
  displayConsentBar() {
    this.displayConsentBarStream$.next(true);
  }

  /**
   * Hides the consent bar.
   */
  hideConsentBar() {
    this.displayConsentBarStream$.next(false);
  }

  /**
   * Displays the consent preferences (panel).
   */
  displayConsentPreferences() {
    this.displayConsentPreferencesStream$.next(true);
  }

  /**
   * Hides the consent preferences (panel).
   */
  hideConsentPreferences() {
    this.displayConsentPreferencesStream$.next(false);
  }

  /**
   * Approves a specific cookie.
   *
   * @param cookie the cookie to approve
   */
  approve(cookie: CookieProvider) {
    this.setOne(cookie, true);
  }

  /**
   * Rejects a specific cookie.
   *
   * @param cookie the cookie to reject
   */
  reject(cookie: CookieProvider) {
    this.setOne(cookie, false);
  }

  /**
   * Approves all cookies (and hides the consent bar)
   */
  approveAll() {
    this.setAll(true);
    this.hideConsentBar();
  }

  /**
   * Rejects all cookies (and hides the consent bar)
   */
  rejectAll() {
    this.setAll(false);
    this.sessionStorage.setItem(BAILOUT_SESSION_KEY, 'true');
    this.hideConsentBar();
  }

  /**
   * Adjusts the enablement for a specific provider
   *
   * @param cookie the cookie / provider to adjust
   * @param enabled enable or disable
   */
  setOne(cookie: CookieProvider, enabled: boolean) {
    if (!this.state.has(cookie)) {
      throw new Error(
        `Unable to adjust value for provider with id: ${cookie.id}`
      );
    }
    if (cookie.id === DEFAULT_SETTINGS_PROVIDER.id) {
      throw new Error(
        `Unable to adjust value for default settings (provider with id: ${cookie.id})`
      );
    }

    this.state.set(cookie, enabled);
    this.writePersistedCookieSettings();
    this.broadcastCookieChanges();
  }

  /**
   * Adjusts the enablement for multiple provider
   *
   * @param multiple the cookie / provider to adjust enablement for (key being id of provider)
   */
  setMany(multiple: { [providerId: string]: boolean }) {
    for (const [id, enabled] of Object.entries(multiple)) {
      let key = null;
      for (const each of this.state.keys()) {
        if (each.id === id) {
          key = each;
        }
      }
      if (!key) {
        throw new Error(`Unable to adjust value for provider with id: ${id}`);
      }
      if (id === DEFAULT_SETTINGS_PROVIDER.id) {
        throw new Error(
          `Unable to adjust value for default settings (provider with id: ${id})`
        );
      }

      this.state.set(key, enabled);
    }
    this.writePersistedCookieSettings();
    this.broadcastCookieChanges();
  }

  /**
   * Adjusts the enablement of all providers
   *
   * @param enabled enable or disable
   */
  setAll(enabled: boolean) {
    for (const key of this.state.keys()) {
      if (key !== DEFAULT_SETTINGS_PROVIDER) {
        this.state.set(key, enabled);
      }
    }
    this.writePersistedCookieSettings();
    this.broadcastCookieChanges();
  }

  /**
   * Determines if a specific provider's cookie is approved
   *
   * @param providerId the id of the provider's cookie to query
   */
  isApproved(providerId: string): boolean {
    for (const [provider, enabled] of this.state.entries()) {
      if (provider.id === providerId) {
        return enabled;
      }
    }
    return false;
  }

  /**
   * Retrieves an Observable stream to receive changes to a specific provider's enablement
   *
   * @param providerId the id of the (cookie) provider to listen for enablement changes to
   */
  getChangesTo(providerId: string): Observable<boolean> {
    return this.cookieEnablementChanges$.pipe(
      filter((each) => each.provider.id === providerId),
      map((enablement) => enablement.enabled),
      distinctUntilChanged()
    );
  }

  /**
   * Retrieves an Observable stream to receive notification to any cookie enablement, even
   * when no change has occurred. This is basically a notification that an approval or
   * rejection has occurred, but its state may not differ from that which it was previously.
   * <p/>
   * NOTICE: This emits an entire array at a time, eg. you'll get all enablements whenever
   * a single enablement changes.
   */
  get cookieEnablement$(): Observable<CookieEnablement[]> {
    return this.cookieEnablementsStream$.asObservable();
  }

  /**
   * Retrieves an Observable stream to receive changes to any cookie enablement
   * <p/>
   * NOTICE: This emits a stream of events, and you'll be notified if multiple
   * changes occur.
   */
  get cookieEnablementChanges$(): Observable<CookieEnablement> {
    return this.cookieEnablement$.pipe(
      distinctUntilChanged((a, b) => {
        for (const each of a) {
          const found = b.find(
            (candidate) => candidate.provider === each.provider
          );
          if (found?.enabled !== each.enabled) {
            return false;
          }
        }
        return true;
      }),
      switchMap((enablements) => enablements)
    );
  }

  /**
   * Retrieves an Observable stream to receive changes to visibility of cookie consent bar
   */
  get displayConsentBar$() {
    return this.displayConsentBarStream$.asObservable();
  }

  /**
   * Retrieves an Observable stream to receive changes to visibility of cookie consent preferences / panel
   */
  get displayConsentPreferences$() {
    return this.displayConsentPreferencesStream$.asObservable();
  }

  private initialize(cookieProviders: CookieProvider[][]) {
    const persistedSettings = this.readPersistedCookieSettings();
    if (this.hasPreviouslyRejectedAll() || persistedSettings) {
      this.hideConsentBar();
    } else if (!persistedSettings) {
      this.displayConsentBar();
    }

    this.state = new Map();

    // Add "default cookie settings" provider
    this.state.set(DEFAULT_SETTINGS_PROVIDER, true);

    // Add cookie settings from configured providers
    cookieProviders
      .reduce((acc, curr) => [...acc, ...curr], [])
      .forEach((provider) => {
        if (this.state.has(provider)) {
          const previous = this.state.get(provider);
          const message = `Multiple CookieProviders of id "${provider.id}" is being registered`;
          console.warn(message, [previous, provider]);
          throw new Error(message);
        }
        this.state.set(
          provider,
          persistedSettings?.enablement[provider.id] ?? false
        );
      });
    this.broadcastCookieChanges();
  }

  private broadcastCookieChanges() {
    const enablements: CookieEnablement[] = [];
    for (const [provider, enabled] of this.state.entries()) {
      enablements.push({ provider, enabled });
    }
    enablements.sort(sortByImportanceAndName);
    this.cookieEnablementsStream$.next(enablements);
  }

  private hasPreviouslyRejectedAll(): boolean {
    return (
      booleanFromString(this.sessionStorage.getItem(BAILOUT_SESSION_KEY)) ??
      false
    );
  }

  private readPersistedCookieSettings(): PersistedCookieSettings | null {
    let parsed = null;
    if (!this.hasPreviouslyRejectedAll()) {
      const raw = this.localStorage.getItem(PERSISTED_COOKIE_SETTINGS_KEY);
      if (raw) {
        parsed = JSON.parse(raw);
      }
    }
    return parsed;
  }

  private writePersistedCookieSettings() {
    const enablement: { [providerId: string]: boolean } = {};
    for (const [provider, enabled] of this.state) {
      enablement[provider.id] = enabled;
    }
    const toSerialize: PersistedCookieSettings = {
      enablement,
    };
    this.sessionStorage.removeItem(BAILOUT_SESSION_KEY);
    this.localStorage.setItem(
      PERSISTED_COOKIE_SETTINGS_KEY,
      JSON.stringify(toSerialize)
    );
  }
}
