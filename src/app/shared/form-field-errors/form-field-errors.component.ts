import { Component, Input } from '@angular/core'
import { AbstractControl } from '@angular/forms'

@Component({
	selector: 'app-form-field-errors',
	templateUrl: './form-field-errors.component.html'
})
export class FormFieldErrorsComponent {
	@Input() control?: AbstractControl | null
}
