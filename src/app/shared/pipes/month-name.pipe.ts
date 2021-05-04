import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'monthName',
})
export class MonthNamePipe implements PipeTransform {
  transform(value: number | Date | unknown): unknown {
    let date: Date | null = null;
    if (typeof value === 'number') {
      date = new Date(2021, value, 1);
    } else if (value instanceof Date) {
      date = value;
    }
    return date ? formatDate(date, 'MMMM', 'en') : null;
  }
}
