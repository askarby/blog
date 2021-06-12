import { ordinalSuffixOf } from './number.test-utils';
import { anyDefined, areDefined, isDefined } from './lang.test-utils';

export const months = [
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
];

const validateRange = (
  value: number,
  config: { min: number; max: number; name: string }
): number => {
  if (value < config.min || value > config.max) {
    throw new Error(`Unable to create Date with ${config.name} being ${value}`);
  }
  return value;
};

export const dateOfYear = (year: number): DateBuilder => new DateBuilder(year);

class DateBuilder {
  private month: number | undefined;
  private dayOfMonth: number | undefined;
  private hours: number | undefined;
  private minutes: number | undefined;
  private seconds: number | undefined;
  private milliseconds: number | undefined;

  constructor(private year: number) {}

  withMonth(nameOfMonth: string): DateBuilder {
    this.month = getMonthIndex(nameOfMonth);
    return this;
  }

  withDay(dayOfMonth: number): DateBuilder {
    this.dayOfMonth = validateRange(dayOfMonth, {
      min: 1,
      max: 31,
      name: 'day of month',
    });
    return this;
  }

  withHours(hours: number): DateBuilder {
    this.hours = validateRange(hours, {
      min: 0,
      max: 23,
      name: 'hours',
    });
    return this;
  }

  withMinutes(minutes: number): DateBuilder {
    this.minutes = validateRange(minutes, {
      min: 0,
      max: 59,
      name: 'minutes',
    });
    return this;
  }

  withSeconds(seconds: number): DateBuilder {
    this.seconds = validateRange(seconds, {
      min: 0,
      max: 59,
      name: 'seconds',
    });
    return this;
  }

  withMilliseconds(milliseconds: number): DateBuilder {
    this.milliseconds = validateRange(milliseconds, {
      min: 0,
      max: 999,
      name: 'milliseconds',
    });
    return this;
  }

  withTime(timeString: string): DateBuilder {
    let pattern = '^(?<hours>\\d{2}):(?<minutes>\\d{2}):(?<seconds>\\d{2})';
    if (timeString.includes('.')) {
      pattern += '(?:.(?<milliseconds>\\d{0,3}))';
    }
    const exp = new RegExp(pattern);
    const result = exp.exec(timeString);
    if (!result) {
      throw new Error(
        `Unable to parse time from input "${timeString}" (using pattern "${pattern}")`
      );
    } else {
      const {
        groups: { hours, minutes, seconds, milliseconds },
      } = result as any;
      if (isDefined(hours)) {
        this.withHours(Number(hours));
      }
      if (isDefined(minutes)) {
        this.withMinutes(Number(minutes));
      }
      if (isDefined(seconds)) {
        this.withSeconds(Number(seconds));
      }
      this.withMilliseconds(isDefined(milliseconds) ? Number(milliseconds) : 0);
      return this;
    }
  }

  withoutTime(): DateBuilder {
    return this.withHours(0).withMinutes(0).withSeconds(0).withMilliseconds(0);
  }

  build(): Date {
    if (this.month === undefined) {
      throw new Error(
        'Unable to create date without month information (did you supply a correct one)?'
      );
    } else {
      const date = new Date(
        this.year,
        this.month,
        this.dayOfMonth,
        this.hours,
        this.minutes,
        this.seconds
      );
      const isValid = !isNaN(date.getTime());
      if (!isValid) {
        throw new Error(`Date: ${this.toString()} is NOT a valid date!`);
      }
      return date;
    }
  }

  toString(format: 'all' | 'date' | 'time' = 'all'): string {
    const getDate = () => {
      if (areDefined(this.year, this.month, this.dayOfMonth)) {
        const monthNumber = months[this.month as number];
        const dayInMonth = ordinalSuffixOf(this.dayOfMonth as number);
        return `${monthNumber} ${dayInMonth}, ${this.year as number}`;
      }
      return null;
    };

    const getTime = () => {
      let formatted = '';
      if (areDefined(this.hours, this.minutes)) {
        const hours = (this.hours as number).toString().padStart(2, '0');
        const minutes = (this.minutes as number).toString().padStart(2, '0');
        formatted = `${hours}:${minutes}`;

        if (anyDefined(this.seconds, this.milliseconds)) {
          const seconds = this.seconds
            ? this.seconds.toString().padStart(2, '0')
            : '00';
          formatted += `:${seconds}`;
          if (isDefined(this.milliseconds)) {
            const milliseconds = (this.milliseconds as number)
              .toString()
              .padStart(2, '000');
            formatted += `.${milliseconds}`;
          }
        }
      }
      return formatted;
    };

    const date = getDate();
    const time = getTime();

    switch (format) {
      case 'all':
        return date && time
          ? `${date} at ${time}`
          : this.getDebugDateString(format);
      case 'date':
        return date ?? this.getDebugDateString(format);
      case 'time':
        return time ?? this.getDebugDateString(time);
      default:
        throw new Error(
          `Unable to produce string on unknown format: "${format}"`
        );
    }
  }

  private getDebugDateString(format: 'all' | 'date' | 'time'): string {
    const numberOf = (value: number | undefined) =>
      isDefined(value) ? (value as number).toString() : '??';

    const month = this.month ? this.month + 1 : undefined;
    const date = [this.year, month, this.dayOfMonth]
      .map(numberOf)
      .map((value) => value.padStart(2, '0'))
      .join('-');

    const time = `${[this.hours, this.minutes, this.seconds]
      .map(numberOf)
      .map((value) => value.padStart(2, '0'))
      .join(':')}.${this.milliseconds ?? '???'}`;

    switch (format) {
      case 'all':
        return `Unable to produce full date and time from: "${date} ${time}"`;
      case 'date':
        return `Unable to produce date from: "${date}"`;
      case 'time':
        return `Unable to produce time from: ${time}`;
    }
  }
}

export const getMonthIndex = (name: string): number => {
  const index = months.findIndex((each) =>
    each.toLowerCase().startsWith(name.toLowerCase())
  );
  if (index === -1) {
    throw new Error(`Unable to create Date with month being ${name}`);
  }
  return index;
};

export const getNameOfMonth = (monthIndex: number): string => {
  if (monthIndex < 0 || monthIndex >= 12) {
    throw new Error(
      `Cannot retrieve name of month with index: ${monthIndex}, they're 0-indexed, and max is 11`
    );
  }
  return months[monthIndex];
};
