import {ImageLimits} from "./image-limits";

describe('Image Limits', () => {
  it('extracts limits correctly', () => {
    const config = "images#1,10,512000";

    const limits = ImageLimits.buildImageLimitsFromConfig(config);

    expect(limits).toBeTruthy();

    if (!limits) {
      return;
    }

    expect(limits.minimum).toBe(1);
    expect(limits.maximum).toBe(10);
    expect(limits.maximumImageSize).toBe(512000);
  });

  it('get minimum returns -1 when data type is incorrect', () => {
    const invalidConfig = "imag";

    const limits = ImageLimits.buildImageLimitsFromConfig(invalidConfig);

    expect(limits).toBe(null);
  });
});
