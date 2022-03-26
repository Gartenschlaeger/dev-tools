import { Component, ElementRef, Input, Optional, Self, ViewChild } from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'
import { LoggingService } from 'src/app/modules/shared/services/logging.service'

@Component({
	selector: 'app-form-textfield',
	templateUrl: './form-textfield.component.html'
})
export class FormTextfieldComponent implements ControlValueAccessor {
	@Input() label?: string
	@Input() placeholder?: string
	@Input() type: 'text' | 'password' = 'text'
	value: any = ''

	@ViewChild('input') inputElement!: ElementRef<HTMLInputElement>

	constructor(
		@Self()
		@Optional()
		public control: NgControl,
		private logger: LoggingService
	) {
		if (control) {
			control.valueAccessor = this
		}
	}

	onChange = (obj: any) => {}
	onTouched = (event: any) => {}

	writeValue(newValue: any): void {
		this.logger.trace('writeValue', this.control.name, newValue)
		this.value = newValue
	}

	registerOnChange(fn: any): void {
		this.logger.trace('registerOnChange', this.control.name)
		this.onChange = fn
	}

	registerOnTouched(fn: any): void {
		this.logger.trace('registerOnTouched', this.control.name)
		this.onTouched = fn
	}

	handleChange(event: Event) {
		const input = event.target as HTMLInputElement
		this.logger.trace('handleChange', this.control.name, input.value)

		this.value = input.value
		this.onChange(input.value)
	}

	handleBlur(event: Event) {
		this.onTouched(event)
	}

	focus() {
		if (this.inputElement) {
			this.inputElement.nativeElement.focus()
		}
	}
}
