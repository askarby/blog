export const toStartWith: jest.CustomMatcher = (
  received: string,
  expected: string
): jest.CustomMatcherResult => {
  const isMatch = received.startsWith(expected);

  return isMatch
    ? {
        pass: true,
        message: () => `Expected ${received} not to start with:\n ${expected}`,
      }
    : {
        pass: false,
        message: () => `Expected ${received} to start with:\n ${expected}`,
      };
};
