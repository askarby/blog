export const toBeTrue: jest.CustomMatcher = (
  received: any
): jest.CustomMatcherResult => {
  const isTrue = typeof received === 'boolean' && received;
  return isTrue
    ? {
        pass: true,
        message: () => `Expected ${received} not to be true`,
      }
    : {
        pass: false,
        message: () => `Expected ${received} to be true`,
      };
};
