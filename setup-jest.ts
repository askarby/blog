/// <reference types="jest" />

import 'jest-preset-angular/setup-jest';
import { toBeTrue } from './src/app/testing/matchers/to-be-true.matcher';
import { toBeFalse } from './src/app/testing/matchers/to-be-false.matcher';
import { toBeAnyOf } from './src/app/testing/matchers/to-be-any-of.matcher';
import { toStartWith } from './src/app/testing/matchers/to-start-with.matcher';

/* global mocks for jsdom */
const mock = () => {
  let storage: { [key: string]: string } = {};
  const storageMock = {
    getItem: (key: string) => (key in storage ? storage[key] : null),
    setItem: (key: string, value: string) => (storage[key] = value || ''),
    removeItem: (key: string) => delete storage[key],
    clear: () => (storage = {}),
  };
  return storageMock;
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
(Error as any).stackTraceLimit = 2;

expect.extend({
  toBeTrue,
  toBeFalse,
  toBeAnyOf,
  toStartWith,
});
