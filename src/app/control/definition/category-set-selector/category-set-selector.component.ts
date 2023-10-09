import {Component, Input} from '@angular/core';
import {Category} from "../../../core/definition/category";
import {InitializationData} from './category-set-selector-dialog/initialization-data';
import {MatDialog} from '@angular/material/dialog';
import {
  CategorySetSelectorDialogComponent
} from './category-set-selector-dialog/category-set-selector-dialog.component';
import {first, Observable, of} from 'rxjs';

@Component({
  selector: 'app-category-set-selector',
  templateUrl: './category-set-selector.component.html',
  styleUrls: ['./category-set-selector.component.css']
})
export class CategorySetSelectorComponent {
  @Input()
  public label: string = "";

  @Input()
  public categories$: Observable<Category[]> = of([]);

  public includedCategories: Category[] = [];
  public excludedCategories: Category[] = [];

  public constructor(
    private _dialog: MatDialog
  ) {

  }

  public removeIncludedCategory(categoryId: string) {
    this.removeCategory(categoryId, this.includedCategories);
  }

  public removeExcludedCategory(categoryId: string) {
    this.removeCategory(categoryId, this.excludedCategories);
  }

  public includeCategory() {
    let excludedIds: string[] = [];

    for (const includedCategory of this.includedCategories) {
      excludedIds.push(includedCategory.id);
    }

    for (const excludedCategory of this.excludedCategories) {
      excludedIds.push(excludedCategory.id);
    }

    const initializationData: InitializationData = {
      categories$: this.categories$,
      inclusionMode: true,
      excludeIds: (excludedIds.length > 0) ? excludedIds : null,
      selectableChildrenOfIds: null
    }

    const dialogRef = this._dialog.open(CategorySetSelectorDialogComponent, {
      data: initializationData
    })

    dialogRef.afterClosed().pipe(first()).subscribe(result => {
      if (!result) {
        return;
      }

      // We expect a Category as the result
      if (!Category.isCategory(result)) {
        return;
      }

      this.includedCategories.push(result);
    });
  }

  public excludeCategory() {

    let selectableChildrenOfIds: string[] = [];

    for (const includedCategory of this.includedCategories) {
      selectableChildrenOfIds.push(includedCategory.id);
    }

    let excludedIds: string[] = [];

    for (const excludedCategory of this.excludedCategories) {
      excludedIds.push(excludedCategory.id);
    }

    const initializationData: InitializationData = {
      categories$: this.categories$,
      inclusionMode: true,
      excludeIds: (excludedIds.length > 0) ? excludedIds : null,
      selectableChildrenOfIds: selectableChildrenOfIds
    }

    const dialogRef = this._dialog.open(CategorySetSelectorDialogComponent, {
      data: initializationData
    })

    dialogRef.afterClosed().pipe(first()).subscribe(result => {
      if (!result) {
        return;
      }

      // We expect a Category as the result
      if (!Category.isCategory(result)) {
        return;
      }

      this.excludedCategories.push(result);
    });
  }

  private removeCategory(categoryId: string, categories: Category[]) {
    let replace: boolean = categories[0].id === categoryId;

    for (let i = 1; i < categories.length; i++) {
      const category = categories[i];

      if (!category) {
        continue;
      }

      if (category.id === categoryId) {
        replace = true;
        continue;
      }

      if (replace) {
        categories[i - 1] = category;
      }
    }

    categories.pop();
  }
}
