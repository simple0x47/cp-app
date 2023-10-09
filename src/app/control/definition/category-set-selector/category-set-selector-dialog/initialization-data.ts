import {Observable} from "rxjs";
import {Category} from "../../../../../../../cwa/src/app/definition/category";

export interface InitializationData {
  categories$: Observable<Category[]>;
  inclusionMode: boolean;
  excludeIds: string[] | null;
  selectableChildrenOfIds: string[] | null;
}
