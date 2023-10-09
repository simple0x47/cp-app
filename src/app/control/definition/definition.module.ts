import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryIndexComponent} from "./category-index/category-index.component";
import {CategorySelectComponent} from "./category-select/category-select.component";
import {CategorySetSelectorComponent} from "./category-set-selector/category-set-selector.component";
import {
  CategorySetSelectorDialogComponent
} from "./category-set-selector/category-set-selector-dialog/category-set-selector-dialog.component";
import {MatChipsModule} from "@angular/material/chips";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatTreeModule} from "@angular/material/tree";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CategoryAttributesComponent} from "./category-attributes/category-attributes.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ControlModule} from "../control.module";
import {EntityModule} from "../entity/entity.module";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {ProductCompositionComponent} from "./product-composition/product-composition.component";
import {
  ProductCompositionDialogComponent
} from "./product-composition/product-composition-dialog/product-composition-dialog.component";
import {MatStepperModule} from "@angular/material/stepper";
import {EntityApiModule} from "../../api/entity-api/entity-api.module";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [
    CategoryIndexComponent,
    CategorySelectComponent,
    CategorySetSelectorComponent,
    CategorySetSelectorDialogComponent,
    CategoryAttributesComponent,
    ProductCompositionComponent,
    ProductCompositionDialogComponent
  ],
  imports: [
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatTreeModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDividerModule,
    MatStepperModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ControlModule,
    EntityModule,
    EntityApiModule,
    CommonModule
  ],
  exports: [
    CategoryAttributesComponent,
    CategoryIndexComponent,
    CategorySelectComponent,
    CategorySetSelectorComponent,
    ProductCompositionComponent
  ]
})
export class DefinitionModule {
}
