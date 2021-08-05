export const toBeFalse: jest.CustomMatcher = (
  received: any
): jest.CustomMatcherResult => {
  const isFalse = typeof received === 'boolean' && !received;
  return isFalse
    ? {
        pass: true,
        message: () => `Expected ${received} not to be false`,
      }
    : {
        pass: false,
        message: () => `Expected ${received} to be false`,
      };
};
