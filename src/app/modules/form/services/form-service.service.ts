import { UntypedFormGroup } from '@angular/forms'

export class FormService {
	validate(group: UntypedFormGroup): boolean {
		for (let field in group.controls) {
			const control = group.get(field)
			control?.markAsDirty()
			control?.markAsTouched()
		}

		return group.valid
	}

	reset(group: UntypedFormGroup, value?: { [key: string]: any }): void {
		group.reset()

		if (value) {
			group.setValue(value)
		}

		group.markAsUntouched()
	}
}
