import {AbstractControl, ValidatorFn} from "@angular/forms";

export function imageCountValidator(minimum: number, maximum: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const files = control.value;

    if (!files || files.length < minimum) {
      return {'requiredImageCount': true};
    }

    if (files && files.length > maximum) {
      return {'exceededMaximumImageCount': true}
    }

    return null;
  }
}
