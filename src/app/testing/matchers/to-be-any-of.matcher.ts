export const toBeAnyOf: jest.CustomMatcher = (
  received: any,
  actual: any[]
): jest.CustomMatcherResult => {
  const isMatch = actual.includes(received);
  const expectedAsJson = JSON.stringify(actual, null, 2);

  return isMatch
    ? {
        pass: true,
        message: () =>
          `Expected ${received} not to be contained in:\n ${expectedAsJson}`,
      }
    : {
        pass: false,
        message: () =>
          `Expected ${received} to be contained in:\n ${expectedAsJson}`,
      };
};
