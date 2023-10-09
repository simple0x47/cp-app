import {Observable} from "rxjs"
import {Category} from "../../../../core/definition/category";

export type InitializationData = {
  categories$: Observable<Category[]>,
  filterByIds: string[] | null
}
