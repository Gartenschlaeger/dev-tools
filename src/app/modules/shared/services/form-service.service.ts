import { UntypedFormGroup } from '@angular/forms';

export class FormService {
    validate(group: UntypedFormGroup): boolean {
        for (let controlName in group.controls) {
            const control = group.get(controlName);
            control?.markAsTouched();
        }

        return group.valid;
    }

    reset(group: UntypedFormGroup, value?: { [key: string]: any }): void {
        group.reset(value);
        group.markAsUntouched();
    }
}
