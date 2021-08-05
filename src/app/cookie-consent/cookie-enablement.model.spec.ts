import { createCookieEnablement } from '../testing/cookie.test-utils';
import { CookieImportance } from './cookie-provider.model';
import { sortByImportanceAndName } from './cookie-enablement.model';

describe('CookieEnablement model', () => {
  describe('sortByImportanceAndName', () => {
    it('should sort by importance first', () => {
      const enablements = [
        createCookieEnablement({
          id: 'a',
          importance: CookieImportance.secondary,
          enabled: true,
        }),
        createCookieEnablement({
          id: 'b',
          importance: CookieImportance.primary,
          enabled: true,
        }),
        createCookieEnablement({
          id: 'c',
          importance: CookieImportance.default,
          enabled: true,
        }),
        createCookieEnablement({
          id: 'd',
          importance: CookieImportance.tertiary,
          enabled: true,
        }),
      ];
      const sorted = enablements.sort(sortByImportanceAndName);
      expect(sorted.map((each) => each.provider.id)).toEqual([
        'c',
        'b',
        'a',
        'd',
      ]);
    });

    it('should sort by name as fallback', () => {
      const enablements = [
        createCookieEnablement({
          id: 'd',
          name: 'delta',
          enabled: true,
        }),
        createCookieEnablement({
          id: 'b',
          name: 'beta',
          enabled: true,
        }),
        createCookieEnablement({
          id: 'a',
          name: 'alpha',
          enabled: true,
        }),
        createCookieEnablement({
          id: 'c',
          name: 'charlie',
          enabled: true,
        }),
      ];
      const sorted = enablements.sort(sortByImportanceAndName);
      expect(sorted.map((each) => each.provider.name)).toEqual([
        'alpha',
        'beta',
        'charlie',
        'delta',
      ]);
    });
  });
});
