import {CategoryValueMap} from "../../../core/definition/category-value-map";

export class ProductCompositionModel {
  /**
   * The display name is a combination of the product's name and the producer's name.
   */
  public readonly displayName: string;

  public constructor(
    public readonly categories: CategoryValueMap,
    name: string,
  ) {
    this.displayName = `${name} - ${categories["product"]["produced_by"]["name"]}`;
  }
}
