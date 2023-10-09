import {ValidatorFn} from "@angular/forms";
import {AttributeValidationTreeNode} from "../../category-attributes/attribute-validation-tree-node";

export function compositionProducedAfterFinalProductValidation(validationTreeNode: AttributeValidationTreeNode): ValidatorFn {
  return (control) => {
    if (validationTreeNode.parent?.abstractControl.value < control.value) {
      return {
        "compositionProducedAfterFinalProduct": true
      }
    }

    return null;
  };
}
