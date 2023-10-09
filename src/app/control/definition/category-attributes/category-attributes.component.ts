import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EntitySelectorComponent} from "../../entity/entity-selector/entity-selector.component";
import {Attribute} from "../../../core/definition/attribute";
import {Category} from "../../../core/definition/category";
import {DefinitionService} from "../../../api/definition-api/definition.service";
import {EntityProviderService} from "../../../api/entity-api/entity-provider.service";
import {ProductCompositionComponent} from "../product-composition/product-composition.component";
import {ProductCompositionModel} from "../product-composition/product-composition-model";
import {ImagesUploaderComponent} from "../../images-uploader/images-uploader.component";
import {AttributeValidationTreeNode} from './attribute-validation-tree-node';
import {Store} from '@ngxs/store';
import {RegisterTreeNode, RemoveTreeNode} from './state/attribute-validation-tree.actions';

@Component({
  selector: 'app-category-attributes',
  templateUrl: './category-attributes.component.html',
  styleUrls: ['./category-attributes.component.css']
})
export class CategoryAttributesComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  public category: Category | null = null;
  public formGroup: FormGroup = this._formBuilder.group({});
  @Output()
  public outputFormGroup: EventEmitter<FormGroup> = new EventEmitter();
  public formValidated: boolean = false;
  private _attributeIdsToAttribute: Map<string, Attribute> = new Map();
  private _attributesValidationTreeNodes: Map<string, AttributeValidationTreeNode> = new Map();
  @ViewChildren(EntitySelectorComponent)
  private _entitySelectors: QueryList<EntitySelectorComponent> | null = null;
  @ViewChildren(ProductCompositionComponent)
  private _compositionComponents: QueryList<ProductCompositionComponent> | null = null;
  @ViewChildren(ImagesUploaderComponent)
  private _imagesUploaders: QueryList<ImagesUploaderComponent> | null = null;

  public constructor(
    public definition: DefinitionService,
    public entityProvider: EntityProviderService,
    private _formBuilder: FormBuilder,
    private _store: Store
  ) {

  }

  public ngOnInit(): void {
    if (!this.category) {
      return;
    }

    for (const attribute of this.category.attributes) {
      this._attributeIdsToAttribute.set(attribute.id, attribute);
      let required = !attribute.optional;

      if (attribute.dataType === "boolean") {
        required = false;
      }

      let formControl = this.getFormControlForAttribute(attribute);

      if (required) {
        formControl?.addValidators(Validators.required);
      }

      this.formGroup.addControl(attribute.id, formControl);
    }

    for (const attributeGroup of this.category.attributesGroups) {
      attributeGroup.addValidatorToFormGroup(this.formGroup);
    }
  }

  public getControlByAttributeId(attributeId: string): AbstractControl<any, any> {
    return this.formGroup.controls[attributeId];
  }

  public ngAfterViewInit(): void {
    this.initializeCustomControls();

    this.outputFormGroup.emit(this.formGroup);

    this.registerAttributesForLinkedValidation();
  }

  public getErrorMessages(): string[] {
    if (!this.category) {
      return [];
    }

    const formErrors = this.formGroup.errors;

    if (!formErrors) {
      return [];
    }

    const errorMessages: string[] = [];

    for (const attributeGroup of this.category.attributesGroups) {
      if (formErrors[attributeGroup.id]) {
        let errorMessage = $localize`At least ${attributeGroup.requiredValues} of the following values must be filled: `;

        for (const attributeId of attributeGroup.attributeIds) {
          const attribute = this._attributeIdsToAttribute.get(attributeId);

          if (!attribute) {
            continue;
          }

          errorMessage += `${attribute.name}, `;
        }

        errorMessage = errorMessage.slice(0, -2);
        errorMessages.push(errorMessage);
      }
    }

    return errorMessages;
  }

  public validate() {
    this.formValidated = true;
  }

  public ngOnDestroy(): void {
    this.removeAttributesForLinkedValidation();
  }

  public getValidationTreeNode(attributeId: string): AttributeValidationTreeNode | null {
    const validationTreeNode = this._attributesValidationTreeNodes.get(attributeId);

    if (!validationTreeNode) {
      return null;
    }

    return validationTreeNode;
  }

  private getFormControlForAttribute(attribute: Attribute): FormControl<any> {
    switch (attribute.dataType) {
      case "string":
        return new FormControl<string | null>(null);
      case "boolean":
        return new FormControl<boolean>(false);
      case "date":
        return new FormControl<Date | null>(null);
      case "datetime":
        return new FormControl<Date | null>(null);
      default:
        if (attribute.dataType.startsWith("decimal")) {
          return new FormControl<number | null>(null);
        } else if (attribute.dataType.startsWith("integer")) {
          return new FormControl<number | null>(null);
        } else if (attribute.dataType.includes("enum#")) {
          return new FormControl<any>(null);
        } else if (attribute.dataType.includes("comp#")) {
          return new FormControl<ProductCompositionModel[] | null>(null);
        }

        return new FormControl();
    }
  }

  private initializeCustomControls(): void {
    if (this._entitySelectors) {
      for (const entitySelector of this._entitySelectors) {
        entitySelector.entityControl.addValidators(Validators.required);
        this.formGroup.addControl(`${entitySelector.entityId}-visible`, entitySelector.entityControl);

        entitySelector.entityInvisibleControl.addValidators(Validators.required);
        this.formGroup.setControl(entitySelector.entityId, entitySelector.entityInvisibleControl);
      }
    }

    if (this._compositionComponents) {
      for (const compositionComponent of this._compositionComponents) {
        compositionComponent.control = this.formGroup.controls[compositionComponent.attributeId];
      }
    }

    if (this._imagesUploaders) {
      for (const imageUploader of this._imagesUploaders) {
        imageUploader.control.addValidators(Validators.required);
        this.formGroup.setControl(imageUploader.attributeId, imageUploader.control);
      }
    }
  }

  private registerAttributesForLinkedValidation() {
    if (!this.category) {
      return;
    }

    for (const attribute of this.category.attributes) {
      const validationTreeNode = new AttributeValidationTreeNode(this.getControlByAttributeId(attribute.id));

      this._attributesValidationTreeNodes.set(attribute.id, validationTreeNode);

      this._store.dispatch(new RegisterTreeNode(attribute.id, validationTreeNode));
    }
  }

  /**
   * Must be called following the LIFO order.
   */
  private removeAttributesForLinkedValidation() {
    if (!this.category) {
      return;
    }

    for (const attribute of this.category.attributes) {
      this._store.dispatch(new RemoveTreeNode(attribute.id));
    }

    this._attributesValidationTreeNodes.clear();
  }
}
