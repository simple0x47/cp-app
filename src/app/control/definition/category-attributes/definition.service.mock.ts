import {Observable} from 'rxjs';
import {Category} from "../../../core/definition/category";
import {Attribute} from "../../../core/definition/attribute";
import {EnumValue} from "../../../core/enum-value";
import {DefinitionService} from "../../../api/definition-api/definition.service";

export class DefinitionServiceMock extends DefinitionService {
  public override suppliableProducts$: Observable<Category[]> = new Observable(observer => {
    const categories: Category[] = [];

    let onlyString = new Category("string", "Le string", false, [
      new Attribute("string_input", "String Input", "string", false)
    ], []);

    categories.push(onlyString);

    observer.next(categories);

    return {
      unsubscribe() {

      },
    }
  });

  public override suppliableModifiers$: Observable<Category[]> = this.suppliableProducts$;

  public override suppliableServiceProviders$: Observable<Category[]> = this.suppliableProducts$;

  private _enumOptionsCachePropietary: Map<string, Observable<EnumValue[]>> = new Map();

  constructor() {
    super();
  }

  /**
   *
   * @param enumId Id of the enum containing the "enum#" prefix.
   */
  public override getOptionsForEnum$(enumId: string): Observable<EnumValue[]> {
    let observable: Observable<EnumValue[]> | undefined = this._enumOptionsCachePropietary.get(enumId);

    if (!observable) {
      observable = new Observable(observer => {
        let example: EnumValue[] = [
          new EnumValue(0, "Test"),
          new EnumValue(1, "Example"),
          new EnumValue(2, "Abcd"),
          new EnumValue(3, "Efgh")
        ];

        observer.next(example)
        observer.complete();
      });

      this._enumOptionsCachePropietary.set(enumId, observable);
    }

    return observable;
  }
}
