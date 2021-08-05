/**
 * Flattens an nested array to a "single level"-array (flattened)
 *
 * @param input the array to flatten
 */
export const flatten = <T>(input: T[][]): T[] =>
  input.reduce((acc, curr) => [...acc, ...curr], []);
