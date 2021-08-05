import { CookieProvider } from './cookie-provider.model';

export interface CookieEnablement {
  provider: CookieProvider;
  enabled: boolean;
}

export const sortByImportanceAndName = (
  a: CookieEnablement,
  b: CookieEnablement
) => {
  const aProvider = a.provider;
  const bProvider = b.provider;
  const byImportance = aProvider.importance - bProvider.importance;
  if (byImportance === 0) {
    return aProvider.name.localeCompare(bProvider.name);
  }
  return byImportance;
};
