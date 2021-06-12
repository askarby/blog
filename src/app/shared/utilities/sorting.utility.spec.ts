import { sort, SortingOrder, SortingUtility } from './sorting.utility';
import { dateOfYear } from '../../testing/date.test-utils';

describe('Sorting utility', () => {
  describe('sort function', () => {
    it('should be able to create a SortingUtility', () => {
      const utility = sort([]);
      expect(utility).toBeInstanceOf(SortingUtility);
    });
  });

  describe('SortingUtility class', () => {
    describe('"by"-method', () => {
      it('should return itself, for method invocation chaining', () => {
        const toSort = [{ a: 'second' }, { a: 'first' }, { a: 'third' }];
        const utility = sort(toSort);
        expect(utility.by('a')).toBe(utility);
      });
    });

    describe('"apply"-method', () => {
      describe('sorting string-properties', () => {
        let toSort: { a: string }[];

        beforeEach(() => {
          toSort = [{ a: 'b' }, { a: 'a' }, { a: 'c' }];
        });

        it('should apply single-property sorting logic (with default ASC-sorting order)', () => {
          const sorted = sort(toSort).by('a').apply();
          expect(sorted).toHaveLength(3);
          expect(sorted.map((each) => each.a)).toEqual(['a', 'b', 'c']);
        });

        it('should apply single-property sorting logic (with explicit ASC-sorting order)', () => {
          const sorted = sort(toSort).by('a', SortingOrder.ASC).apply();
          expect(sorted).toHaveLength(3);
          expect(sorted.map((each) => each.a)).toEqual(['a', 'b', 'c']);
        });

        it('should apply single-property sorting logic (with explicit DESC-sorting order)', () => {
          const sorted = sort(toSort).by('a', SortingOrder.DESC).apply();
          expect(sorted).toHaveLength(3);
          expect(sorted.map((each) => each.a)).toEqual(['c', 'b', 'a']);
        });

        it('should not modify passed in array (immutability)', () => {
          const sorted = sort(toSort).by('a').apply();
          expect(sorted).not.toBe(toSort);
        });
      });

      describe('sorting number-properties', () => {
        let toSort: { a: number }[];

        beforeEach(() => {
          toSort = [{ a: 2 }, { a: 1 }, { a: 3 }];
        });

        it('should apply single-property sorting logic (with default ASC-sorting order)', () => {
          const sorted = sort(toSort).by('a').apply();
          expect(sorted).toHaveLength(3);
          expect(sorted.map((each) => each.a)).toEqual([1, 2, 3]);
        });

        it('should apply single-property sorting logic (with explicit ASC-sorting order)', () => {
          const sorted = sort(toSort).by('a', SortingOrder.ASC).apply();
          expect(sorted).toHaveLength(3);
          expect(sorted.map((each) => each.a)).toEqual([1, 2, 3]);
        });

        it('should apply single-property sorting logic (with explicit DESC-sorting order)', () => {
          const sorted = sort(toSort).by('a', SortingOrder.DESC).apply();
          expect(sorted).toHaveLength(3);
          expect(sorted.map((each) => each.a)).toEqual([3, 2, 1]);
        });

        it('should not modify passed in array (immutability)', () => {
          const sorted = sort(toSort).by('a').apply();
          expect(sorted).not.toBe(toSort);
        });
      });

      describe('sorting date-properties', () => {
        let toSort: { a: Date }[];

        beforeEach(() => {
          const builder = dateOfYear(1981).withMonth('april').withoutTime();
          toSort = [
            { a: builder.withDay(2).build() },
            { a: builder.withDay(1).build() },
            { a: builder.withDay(3).build() },
          ];
        });

        it('should apply single-property sorting logic (with default ASC-sorting order)', () => {
          const sorted = sort(toSort).by('a').apply();
          expect(sorted).toHaveLength(3);
          expect(sorted.map((each) => each.a.getDate())).toEqual([1, 2, 3]);
        });

        it('should apply single-property sorting logic (with explicit ASC-sorting order)', () => {
          const sorted = sort(toSort).by('a', SortingOrder.ASC).apply();
          expect(sorted).toHaveLength(3);
          expect(sorted.map((each) => each.a.getDate())).toEqual([1, 2, 3]);
        });

        it('should apply single-property sorting logic (with explicit DESC-sorting order)', () => {
          const sorted = sort(toSort).by('a', SortingOrder.DESC).apply();
          expect(sorted).toHaveLength(3);
          expect(sorted.map((each) => each.a.getDate())).toEqual([3, 2, 1]);
        });

        it('should not modify passed in array (immutability)', () => {
          const sorted = sort(toSort).by('a').apply();
          expect(sorted).not.toBe(toSort);
        });
      });

      describe('sorting on multiple properties', () => {
        let toSort: { a: number; b: string }[];

        beforeEach(() => {
          toSort = [
            { a: 2, b: 'b' },
            { a: 2, b: 'c' },
            { a: 2, b: 'a' },
          ];
        });

        it('should apply multi-property sorting logic (with default ASC-sorting order)', () => {
          const sorted = sort(toSort).by('a').by('b').apply();
          expect(sorted).toEqual([
            { a: 2, b: 'a' },
            { a: 2, b: 'b' },
            { a: 2, b: 'c' },
          ]);
        });

        it('should apply multi-property sorting logic (with explicit ASC-sorting order)', () => {
          const sorted = sort(toSort)
            .by('a', SortingOrder.ASC)
            .by('b', SortingOrder.ASC)
            .apply();
          expect(sorted).toEqual([
            { a: 2, b: 'a' },
            { a: 2, b: 'b' },
            { a: 2, b: 'c' },
          ]);
        });

        it('should apply multi-property sorting logic (with explicit DESC-sorting order)', () => {
          const sorted = sort(toSort)
            .by('a', SortingOrder.DESC)
            .by('b', SortingOrder.DESC)
            .apply();
          expect(sorted).toEqual([
            { a: 2, b: 'c' },
            { a: 2, b: 'b' },
            { a: 2, b: 'a' },
          ]);
        });

        it('should apply multi-property sorting logic (with mixed property sorting order)', () => {
          const sorted = sort(toSort)
            .by('a', SortingOrder.DESC)
            .by('b', SortingOrder.ASC)
            .apply();
          expect(sorted).toEqual([
            { a: 2, b: 'a' },
            { a: 2, b: 'b' },
            { a: 2, b: 'c' },
          ]);
        });

        it('should not modify passed in array (immutability)', () => {
          const sorted = sort(toSort).by('a').by('b').apply();
          expect(sorted).not.toBe(toSort);
        });
      });

      describe('unsupported property types', () => {
        it('should throw an error if sorting upon boolean property', () => {
          const toSort = [{ a: true }, { a: false }];
          expect(() => sort(toSort).by('a').apply()).toThrow(
            'Unable to sort upon properties of types: boolean and boolean'
          );
        });

        it('should throw an error if sorting upon array property', () => {
          const toSort = [{ a: [1, 2, 3] }, { a: [3, 2, 1] }];
          expect(() => sort(toSort).by('a').apply()).toThrow(
            'Unable to sort upon properties of types: object and object'
          );
        });

        it('should throw an error if sorting upon object property', () => {
          const toSort = [{ a: { b: 1 } }, { a: { b: 2 } }];
          expect(() => sort(toSort).by('a').apply()).toThrow(
            'Unable to sort upon properties of types: object and object'
          );
        });
      });
    });
  });
});
