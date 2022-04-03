import { Component, ElementRef, Input, Optional, Self, ViewChild } from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'
import { LoggingService } from 'src/app/modules/shared/services/logging.service'

@Component({
	selector: 'app-form-checkbox',
	templateUrl: './form-checkbox.component.html'
})
export class FormCheckboxComponent implements ControlValueAccessor {
	@Input() isDisabled: boolean = false
	@Input() prefix?: string

	@ViewChild('input') input!: ElementRef<HTMLInputElement>

	isChecked: boolean = false

	constructor(
		@Self()
		@Optional()
		public control: NgControl,
		private logging: LoggingService
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
		this.logging.trace('writeValue', this.control.name, value)
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
