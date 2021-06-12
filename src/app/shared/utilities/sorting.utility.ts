export const sort = <T>(array: T[]): SortingUtility<T> =>
  new SortingUtility<T>(array);

export enum SortingOrder {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ASC,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DESC,
}

interface SortingEntry<T> {
  property: keyof T;
  order: SortingOrder;
}

export class SortingUtility<T> {
  private readonly sortingBy: SortingEntry<T>[];

  constructor(private array: T[]) {
    this.sortingBy = [];
  }

  by(property: keyof T, order = SortingOrder.ASC): SortingUtility<T> {
    const entry: SortingEntry<T> = { property, order };
    const existing = this.sortingBy.findIndex(
      (each) => each.property === property
    );
    if (existing === -1) {
      this.sortingBy.push(entry);
    } else {
      throw new Error(
        'SortingUtility :: Unable to sort by same property twice'
      );
    }
    return this;
  }

  apply(): T[] {
    return [...this.array].sort((a, b) => {
      let result = 0;
      for (let i = 0; i < this.sortingBy.length && result === 0; i++) {
        const { property, order } = this.sortingBy[i];

        const aValue = a[property];
        const bValue = b[property];

        result = this.compare(aValue, bValue, order);
      }
      return result;
    });
  }

  private compare(a: any, b: any, order: SortingOrder): number {
    const hasValue = (value: any): boolean =>
      ![null, undefined].includes(value);
    let sortingValue = 0;
    if (hasValue(a) && hasValue(b)) {
      if (typeof a === 'string' && typeof b === 'string') {
        sortingValue = a.localeCompare(b);
      } else if (typeof a === 'number' && typeof b === 'number') {
        sortingValue = a - b;
      } else if (a instanceof Date && b instanceof Date) {
        sortingValue = a.getTime() - b.getTime();
      } else {
        throw new Error(
          `Unable to sort upon properties of types: ${typeof a} and ${typeof b}`
        );
      }
    } else if (a === b) {
      return 0;
    } else if (!hasValue(a)) {
      sortingValue = 1;
    } else if (!hasValue(b)) {
      sortingValue = -1;
    }

    return sortingValue * (order === SortingOrder.DESC ? -1 : 1);
  }
}
