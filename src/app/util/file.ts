import { Observable } from 'rxjs';
import { Result } from '../core/result';

import { SHA256 } from 'crypto-js';

export function hashFile$(file: File): Observable<Result<string, string>> {
  const observable: Observable<Result<string, string>> = new Observable(
    (observer) => {
      file.text().then(
        (result) => {
          if (!result) {
            observer.next(Result.Err($localize`Failed to read file.`));
            observer.complete();
            return;
          }

          const hash = SHA256(result);

          observer.next(Result.Ok(hash.toString()));
          observer.complete();
        },
        (rejection) => {
          observer.next(Result.Err($localize`Failed to read file.`));
          observer.complete();
        },
      );
    },
  );

  return observable;
}
