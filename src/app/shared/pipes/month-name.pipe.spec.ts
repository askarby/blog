import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator';

import { MonthNamePipe } from './month-name.pipe';

describe('MonthNamePipe ', () => {
  const createPipe = createPipeFactory(MonthNamePipe);
  let spectator: SpectatorPipe<MonthNamePipe>;

  [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ].forEach((expected, input) => {
    it(`should be able to output "${expected}" when input is ${input}`, () => {
      spectator = createPipe(`<div>{{ input | monthName }}</div>`, {
        hostProps: {
          input,
        },
      });
      expect(spectator.element).toHaveText(expected);
    });
  });
});
