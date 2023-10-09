import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatChipSelectionChange} from '@angular/material/chips';
import {Category} from "../../../core/definition/category";
import {CategoryIndexClick} from './category-index-click';

@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html',
  styleUrls: ['./category-index.component.css']
})
export class CategoryIndexComponent {
  @Input()
  public category: Category = new Category("", "", false, [], []);

  @Output()
  public categorySelect: EventEmitter<CategoryIndexClick> = new EventEmitter();

  private static recursivelyIndexCategory(category: Category, categories: Category[]) {
    if (category.parent) {
      CategoryIndexComponent.recursivelyIndexCategory(category.parent, categories);
    }

    categories.push(category);
  }

  public indexCategory(): Category[] {
    if (!this.category.parent) {
      return [this.category];
    }

    const categories: Category[] = [];

    CategoryIndexComponent.recursivelyIndexCategory(this.category, categories);

    return categories;
  }

  public selectChange(event: MatChipSelectionChange) {
    try {
      if (!event.source) {
        return;
      }

      if (!event.source.value) {
        return;
      }

      const value = event.source.value;
      if (typeof value !== "string") {
        return;
      }

      this.categorySelect.emit({
        targetCategory: value
      });
    } catch (e) {
      // event.source.value triggers a TypeError whenever the chip is not
      // initialized. That is why we explicitly ignore it.
      console.log("ignored TypeError: " + e);
    }
  }
}
