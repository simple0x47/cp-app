export class Result<TOk, TError> {
  private _ok: TOk | null;
  private _error: TError | null;

  private constructor(ok: TOk | null, error: TError | null) {
    this._ok = ok;
    this._error = error;
  }

  public static Ok<TOk, TError>(ok: TOk): Result<TOk, TError> {
    let result: Result<TOk, TError> = new Result<TOk, TError>(ok, null);

    return result;
  }

  public static Err<OkType, ErrorType>(
    error: ErrorType,
  ): Result<OkType, ErrorType> {
    let result: Result<OkType, ErrorType> = new Result<OkType, ErrorType>(
      null,
      error,
    );

    return result;
  }

  public isOk(): boolean {
    return this._ok !== null;
  }

  public unwrap(): TOk {
    if (this._ok === null) {
      throw new Error('Expected result to be ok.');
    }

    return this._ok;
  }

  public unwrapErr(): TError {
    if (this._error === null) {
      throw new Error('Expected result to be an error.');
    }

    return this._error;
  }
}
