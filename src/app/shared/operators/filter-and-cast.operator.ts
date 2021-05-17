import { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

type Constructor<T> = new (...args: any[]) => T;

export const filterAndCast = <T>(
  type: Constructor<T>
): OperatorFunction<any, T> => (input: Observable<any>) =>
  input.pipe(filter((each) => each instanceof type));
