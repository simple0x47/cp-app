export class Failure<TErrorKind> {
  private readonly _errorKind: TErrorKind;
  private readonly _message: string;

  public constructor(errorKind: TErrorKind, message: string) {
    this._errorKind = errorKind;
    this._message = message;
  }

  public get errorKind(): TErrorKind {
    return this._errorKind;
  }

  public get message(): string {
    return this._message;
  }
}
