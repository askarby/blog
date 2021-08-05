import { PersistedCookieSettings } from '../cookie-consent/persisted-cookie-settings.model';
import {
  CookieImportance,
  CookieProvider,
} from '../cookie-consent/cookie-provider.model';
import { CookieEnablement } from '../cookie-consent/cookie-enablement.model';

const providerNames = [
  'Bob',
  'Barry',
  'John',
  'Ringo',
  'Paul',
  'Peter',
  'Elias',
  'Julia',
  'Andreas',
];

export const createCookieProvider = (
  seed: Partial<CookieProvider> & { id: string } = { id: 'some-cookie-id' }
): CookieProvider => ({
  id: seed.id,
  importance: seed.importance ?? CookieImportance.primary,
  name: seed.name ?? `The ${seed.id} provider`,
  description: seed.description ?? `Provides all things "${seed.id}"!`,
});

export const createCookieProviders = (
  numberOfProviders: number = providerNames.length
): CookieProvider[] => {
  const toCopy = Math.min(numberOfProviders, providerNames.length);
  return providerNames
    .filter((each, index) => index < toCopy)
    .map((each, index) => {
      let importance: CookieImportance;
      switch (index) {
        case 0:
          importance = CookieImportance.primary;
          break;
        case 1:
          importance = CookieImportance.secondary;
          break;
        default:
          importance = CookieImportance.tertiary;
          break;
      }

      return createCookieProvider({
        id: each,
        importance,
      });
    });
};

export const createCookieEnablement = (
  seed: Partial<CookieProvider> & { id: string; enabled: boolean } = {
    id: 'some-cookie-id',
    enabled: true,
  }
): CookieEnablement => {
  const provider = createCookieProvider(seed);
  return {
    provider,
    enabled: seed.enabled,
  };
};

export interface CreatePersistedCookieSettingsConfiguration {
  providers: CookieProvider[];
  strategy: 'ENABLE_ALL' | 'DISABLE_ALL';
}

export const createPersistedCookieSettings = (
  config: CreatePersistedCookieSettingsConfiguration = {
    providers: [],
    strategy: 'ENABLE_ALL',
  }
): PersistedCookieSettings => {
  const enablement: { [id: string]: boolean } = {};
  config.providers.forEach(({ id }) => {
    enablement[id] = config.strategy === 'ENABLE_ALL';
  });
  return { enablement };
};
