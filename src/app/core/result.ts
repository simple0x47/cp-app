export class Ok<T> {
  public constructor(
    public readonly value: T
  ) {

  }
}

export class Err<T> {
  public constructor(
    public readonly value: T
  ) {

  }
}

export class Result<OkType, ErrorType> {
  private _ok: Ok<OkType> | null;
  private _error: Err<ErrorType> | null;

  public constructor(okOrErr: Ok<OkType> | Err<ErrorType>) {
    if (okOrErr instanceof Ok) {
      this._ok = okOrErr;
      this._error = null;
    } else {
      this._ok = null;
      this._error = okOrErr;
    }
  }

  public isOk(): boolean {
    return (this._ok !== null);
  }

  public isErr(): boolean {
    return (this._error !== null);
  }

  public unwrap(): OkType {
    if (this._ok === null) {
      throw new Error("Expected result to be ok.");
    }

    return this._ok.value;
  }

  public unwrapErr(): ErrorType {
    if (this._error === null) {
      throw new Error("Expected result to be an error.");
    }

    return this._error.value;
  }
}
