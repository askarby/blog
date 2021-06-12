import 'jest-preset-angular/setup-jest';
import { toBeAnyOf } from './src/app/testing/matchers/to-be-any-of.matcher';
import { toStartWith } from './src/app/testing/matchers/to-start-with.matcher';

/* global mocks for jsdom */
const mock = () => {
  let storage: { [key: string]: string } = {};
  return {
    getItem: (key: string) => (key in storage ? storage[key] : null),
    setItem: (key: string, value: string) => (storage[key] = value || ''),
    removeItem: (key: string) => delete storage[key],
    clear: () => (storage = {}),
  };
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance'],
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => ({
    enumerable: true,
    configurable: true,
  }),
});

/* output shorter and more meaningful Zone error stack traces */
Error.stackTraceLimit = 2;

// Custom matchers
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeAnyOf(expected: any[]): CustomMatcherResult;
      toStartWith(expected: string): CustomMatcherResult;
    }
  }
}
expect.extend({
  toBeAnyOf,
  toStartWith,
});
