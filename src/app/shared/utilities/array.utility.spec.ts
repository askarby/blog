import { flatten } from './array.utility';

describe('Array utilities', () => {
  describe('flatten', () => {
    it('should flatten an array', () => {
      const input = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ];
      const flattened = flatten(input);
      expect(flattened).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']);
    });
  });
});
