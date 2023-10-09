export class DataPair {
  public constructor(
    public readonly displayName: string,
    public readonly value: any,
  ) {

  }

  public toString = (): string => {
    return this.displayName;
  }
}
