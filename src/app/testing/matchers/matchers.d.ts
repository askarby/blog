export {};

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeTrue(): T;
      toBeFalse(): T;
      toBeAnyOf(expected: any[]): T;
      toStartWith(expected: string): T;
    }
    interface ExpectExtendMap {
      // Here, we're describing the call signature of our
      // matcher for the "expect.extend()" call.
      toBeTrue: CustomMatcher;
      toBeFalse: CustomMatcher;
      toBeAnyOf: CustomMatcher;
      toStartWith: CustomMatcher;
    }
  }
}
