export const isDefined = (arg: any): boolean => arg !== undefined;

export const isUndefined = (arg: any): boolean => arg === undefined;

export const areDefined = (...args: any[]): boolean =>
  [...args].map(isDefined).every(Boolean);

export const anyDefined = (...args: any[]): boolean =>
  [...args].map(isDefined).some(Boolean);
