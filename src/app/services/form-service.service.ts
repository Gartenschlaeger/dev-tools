import { FormControl, FormGroup } from '@angular/forms'

export class FormService {
    validateForm(group: FormGroup): boolean {
        for (let field in group.controls) {
            let control = group.get(field)
            control?.markAsTouched()
        }

        return group.valid
    }

    resetForm(group: FormGroup): void {
        for (let field in group.controls) {
            let control = group.get(field)
            control?.markAsUntouched()
        }

        group.reset()
    }

    GetControl(group: FormGroup, controlPath: string): FormControl {
        return group.get(controlPath) as FormControl
    }

    getControlValue(group: FormGroup, controlPath: string): string {
        const control = group.get(controlPath)
        if (control) {
            return control.value
        }

        return ''
    }
}
