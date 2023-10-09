import {AbstractControl} from "@angular/forms";

export class AttributeValidationTreeNode {
  public parent: AttributeValidationTreeNode | null = null;
  public readonly abstractControl: AbstractControl<any, any>;

  public constructor(abstractControl: AbstractControl<any>) {
    this.abstractControl = abstractControl;
  }
}
