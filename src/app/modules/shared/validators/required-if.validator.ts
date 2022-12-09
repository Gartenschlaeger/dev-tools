import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function requiredIfValidator(
    mainControl: string,
    mainControlValue: string,
    requiredControl: string
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valueMain = control.get(mainControl)?.value;
        const valueRequired = control.get(requiredControl)?.value;

        if (
            valueMain &&
            valueMain === mainControlValue &&
            typeof valueRequired === 'string' &&
            valueRequired.length === 0
        ) {
            return { requiredIf: true };
        }

        return null;
    };
}
