export class ImageLimits {
  private constructor(
    public readonly minimum: number,
    public readonly maximum: number,
    public readonly maximumImageSize: number
  ) {

  }

  /**
   *
   * @param config string which must follow this scheme: `images#minimumFiles,maximumFiles,maximumFileSizeInBytes`.
   * For example, `images#1,10,512000` indicates that there must be at least 1 image and a maximum of 10, where each one cannot be
   * greater than 512000 bytes.
   * @returns `null` if config is invalid, otherwise it returns an instance of `ImageLimits` containing the limits described by the config.
   */
  public static buildImageLimitsFromConfig(config: string): ImageLimits | null {
    config = config.replace("images#", "");
    const details = config.split(",");

    if (details.length !== 3) {
      return null;
    }

    return new ImageLimits(
      Number.parseInt(details[0]),
      Number.parseInt(details[1]),
      Number.parseInt(details[2])
    );
  }
}
