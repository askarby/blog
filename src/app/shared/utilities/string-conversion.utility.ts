/**
 * Parses a boolean from a string.
 *
 * This function determines a boolean value from a string, by evaluating if the string
 * equals "true" or "false", regardless of case-sensitivity.
 *
 * <b>Notice:</b> that no coercing occurs, hence an empty string will not considered
 * false, and an non-empty string won't be true. Those values will evaluate to `null`!
 *
 * @param input the input to determine the boolean value from
 */
export const booleanFromString = (
  input: string | undefined | null
): boolean | null => {
  switch ((input ?? '').toLowerCase()) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return null;
  }
};
