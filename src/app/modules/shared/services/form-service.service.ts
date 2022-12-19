import { UntypedFormGroup } from '@angular/forms';

export class FormService {
    validate(group: UntypedFormGroup): boolean {
        this.markControlsAsTouched(group);
        return group.valid;
    }

    private markControlsAsTouched(group: UntypedFormGroup) {
        for (let controlName in group.controls) {
            const control = group.get(controlName);
            if (control instanceof UntypedFormGroup) {
                this.markControlsAsTouched(control);
            }

            control?.markAsTouched();
        }
    }

    reset(group: UntypedFormGroup, value?: { [key: string]: any }): void {
        group.reset(value);
        group.markAsUntouched();
    }
}
