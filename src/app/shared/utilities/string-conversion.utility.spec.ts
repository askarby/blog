import { booleanFromString } from './string-conversion.utility';

describe('String conversion utilities', () => {
  describe('booleanFromString', () => {
    it('should parse true from the string value "true" of any casing', () => {
      ['TRUE', 'true', 'TrUe'].forEach((candidate) => {
        expect(booleanFromString(candidate)).toBeTrue();
      });
    });

    it('should parse false from the string value "false" of any casing', () => {
      ['FALSE', 'false', 'FaLsE'].forEach((candidate) => {
        expect(booleanFromString(candidate)).toBeFalse();
      });
    });

    [null, undefined].forEach((absent) => {
      it(`should parse null from an absent string (${absent})`, () => {
        expect(booleanFromString(absent)).toBeNull();
      });
    });

    it('should parse null from a string value not being "true" or "false" of any casing', () => {
      ['YES', 'yep', 'perhaps', 'NO', 'not', 'nopealicious', ''].forEach(
        (candidate) => {
          expect(booleanFromString(candidate)).toBeNull();
        }
      );
    });
  });
});
