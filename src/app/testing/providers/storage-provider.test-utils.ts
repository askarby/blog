import { FactoryProvider, InjectionToken } from '@angular/core';
import { createSpyObj } from 'jest-createspyobj';

export const createStorageProvider = (
  token: InjectionToken<any>,
  values: { [key: string]: string } = {}
): FactoryProvider => ({
  provide: token,
  useFactory: () => {
    const storage = createSpyObj('Storage', [
      'setItem',
      'getItem',
      'removeItem',
    ]);
    storage.getItem.mockImplementation((key: string) => values[key]);
    return storage;
  },
});
