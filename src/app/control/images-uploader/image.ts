import { first, Observable } from "rxjs";
import { Err, Ok, Result } from "../../core/result";
import { hashFile$ } from "../../util/file";

export class Image {
  private constructor(
    public url: string,
    public hash: string
  ) {

  }

  public static readFromFile$(file: File): Observable<Result<Image, string>> {
    const observable: Observable<Result<Image, string>> = new Observable(observer => {
      const hashSubscription = hashFile$(file).pipe(first()).subscribe(hashResult => {
        if (hashResult.isErr()) {
          observer.next(new Result<Image, string>(new Err(hashResult.unwrapErr())));
          observer.complete();

          return;
        }

        const fileHash = hashResult.unwrap();

        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target === null) {
            observer.next(new Result<Image, string>(
              new Err($localize`Failed to read image. Error code 1.`)));
            observer.complete();
            return;
          }

          if (!event.target.result) {
            observer.next(new Result<Image, string>(
              new Err($localize`Failed to read image. Error code 2.`)));
            observer.complete();
            return;
          }

          if (typeof event.target.result !== "string") {
            observer.next(new Result<Image, string>(
              new Err($localize`Failed to read image. Error code 3.`)));
            observer.complete();
            return;
          }

          observer.next(new Result<Image, string>(new Ok(new Image(event.target.result, fileHash))));
          observer.complete();
        };

        reader.onerror = (event) => {
          observer.next(new Result<Image, string>(
            new Err($localize`Failed to read image, error: ${event.target?.error}`)));
          observer.complete();
        }

        reader.readAsDataURL(file);
      });

      return {
        unsubscribe() {
          hashSubscription.unsubscribe();
        },
      }
    });

    return observable;
  }
}
