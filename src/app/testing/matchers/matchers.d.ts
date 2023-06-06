export {};

type OwnMatcher<Params extends unknown[]> = (
  this: jest.MatcherContext,
  actual: unknown,
  ...params: Params
) => jest.CustomMatcherResult;

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
      toBeTrue: OwnMatcher<any>;
      toBeFalse: OwnMatcher<any>;
      toBeAnyOf: OwnMatcher<any>;
      toStartWith: OwnMatcher<any>;
    }
  }
}
