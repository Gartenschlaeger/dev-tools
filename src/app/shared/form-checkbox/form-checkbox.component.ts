import { Component, ElementRef, Input, Optional, Self, ViewChild } from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'

@Component({
	selector: 'app-form-checkbox',
	templateUrl: './form-checkbox.component.html'
})
export class FormCheckboxComponent implements ControlValueAccessor {
	@Input() label?: string
	@Input() isDisabled: boolean = false

	@ViewChild('input') input!: ElementRef<HTMLInputElement>

	isChecked: boolean = false

	constructor(
		@Self()
		@Optional()
		public control: NgControl
	) {
		if (control) {
			control.valueAccessor = this
		}
	}

	handleChange(event: Event) {
		this.onChange(this.input.nativeElement.checked)
	}

	onChange = (obj: any) => {}
	onTouched = (event: any) => {}

	writeValue(value: boolean): void {
		// console.log('writeValue', this.control.name, value)
		this.isChecked = value
	}

	registerOnChange(fn: any): void {
		this.onChange = fn
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn
	}

	setDisabledState(isDisabled: boolean) {
		this.isDisabled = isDisabled
	}
}
