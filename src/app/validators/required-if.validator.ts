import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

// TODO: make generic
export function requiredIfValidator(
    mainControl: string,
    mainControlValue: string,
    requiredControl: string
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const networkMode = control.get(mainControl)?.value
        const networkName = control.get(requiredControl)?.value

        if (
            networkMode &&
            networkMode === mainControlValue &&
            typeof networkName === 'string' &&
            networkName.length === 0
        ) {
            return { requiredIf: true }
        }

        return null
    }
}
