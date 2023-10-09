import {Component, EventEmitter, Inject, Output, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {first, Observable} from 'rxjs';
import {Category} from "../../../../core/definition/category";
import {InitializationData} from './initialization-data';
import {SelectCategoryEvent} from "../../category-select/select-category-event";
import {AttributeValueMap} from "../../../../core/definition/attribute-value-map";
import {CategoryValueMap} from "../../../../core/definition/category-value-map";
import {ProductCompositionModel} from '../product-composition-model';
import {CategoryAttributesComponent} from "../../category-attributes/category-attributes.component";
import {PRODUCT_CATEGORY_ID, PRODUCT_PRODUCTION_DATE_ATTRIBUTE_ID} from "../../../../core/definition/constants";
import {compositionProducedAfterFinalProductValidation} from './composition-produced-after-final-product-validation';

@Component({
  selector: 'app-product-composition-dialog',
  templateUrl: './product-composition-dialog.component.html',
  styleUrls: ['./product-composition-dialog.component.css']
})
export class ProductCompositionDialogComponent {
  @Output()
  public onCreateProductSupply: EventEmitter<Map<string, Map<string, any>>> = new EventEmitter();

  public categories$: Observable<Category[]>;
  public filterByIds: string[] | null;

  public categoryGroup = this._formBuilder.group({
    categoryControl: new FormControl<Category | null>(null, Validators.required),
  });

  public formCategoryGroups: Map<string, FormGroup> = new Map();

  public selectedCategory: Category | null = null;
  public isCompleted: boolean = false;

  @ViewChildren(CategoryAttributesComponent)
  private _categoriesAttributes: QueryList<CategoryAttributesComponent> = new QueryList();

  public constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) _initializationData: InitializationData,
    private _instance: MatDialogRef<ProductCompositionDialogComponent>
  ) {
    this.categories$ = _initializationData.categories$;
    this.filterByIds = _initializationData.filterByIds;
  }

  public selectCategory(event: SelectCategoryEvent) {
    this.selectedCategory = event.target;
    this.formCategoryGroups.clear();

    for (const category of event.target.treePath()) {
      this.formCategoryGroups.set(category.id, this._formBuilder.group({}));
    }

    this._categoriesAttributes.changes.pipe(first()).subscribe(() => this.registerProductionDateValidator());
  }

  public deselectCategory() {
    this.selectedCategory = null;
  }

  public closeDialogWithProductData() {
    this.validateForms();

    if (!this.isCompleted) {
      return;
    }

    const categoriesMap: CategoryValueMap = new CategoryValueMap();

    if (!this.selectedCategory) {
      return;
    }

    if (!this.isCompleted) {
      return;
    }

    for (const category of this.selectedCategory.treePath()) {
      const categoryForm = this.formCategoryGroups.get(category.id);

      if (!categoryForm) {
        console.warn(`category '${category.id}' has no form group.`);
        continue;
      }

      const attributesMap: AttributeValueMap = new AttributeValueMap();

      for (const attribute of category.attributes) {
        const attributeControl = categoryForm.controls[attribute.id];

        if (!attributeControl) {
          console.warn(`attribute '${attribute.id}' has no form control.`);
          continue;
        }

        attributesMap[attribute.id] = categoryForm.controls[attribute.id].value;
      }

      categoriesMap[category.id] = attributesMap;
    }

    this._instance.close(new ProductCompositionModel(categoriesMap, this.selectedCategory.name));
  }

  public validateForms() {
    let areFormsValid = true;
    for (const category of this.formCategoryGroups.keys()) {
      const formGroup = this.formCategoryGroups.get(category);

      if (!formGroup) {
        continue;
      }

      if (!formGroup.valid) {
        areFormsValid = false;
        break;
      }
    }

    this.isCompleted = areFormsValid;
  }

  public onClickNext(categoryId: string) {
    for (const categoryAttributes of this._categoriesAttributes) {
      if (categoryAttributes.category?.id === categoryId) {
        categoryAttributes.validate();
        break;
      }
    }
  }

  public registerProductionDateValidator() {
    console.log("Register");

    for (const categoryAttributes of this._categoriesAttributes) {
      if (!categoryAttributes.category) {
        continue;
      }

      if (categoryAttributes.category.id === PRODUCT_CATEGORY_ID) {
        console.log("CategoryID: " + categoryAttributes.category.id);
        const validationTreeNode = categoryAttributes.getValidationTreeNode(PRODUCT_PRODUCTION_DATE_ATTRIBUTE_ID);

        if (!validationTreeNode) {
          return;
        }

        console.log("adding validator");
        // Add production date validation.
        validationTreeNode?.abstractControl
          .addValidators(compositionProducedAfterFinalProductValidation(validationTreeNode));
        break;
      }
    }
  }
}
