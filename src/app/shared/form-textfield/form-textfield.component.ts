import { Component, ElementRef, Input, Optional, Self, ViewChild } from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'

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
		public control: NgControl
	) {
		if (control) {
			control.valueAccessor = this
		}
	}

	onChange = (obj: any) => {}
	onTouched = (event: any) => {}

	writeValue(newValue: any): void {
		//console.debug('writeValue', this.control.name, newValue)
		this.value = newValue
	}

	registerOnChange(fn: any): void {
		//console.debug('registerOnChange', this.control.name)
		this.onChange = fn
	}

	registerOnTouched(fn: any): void {
		//console.debug('registerOnTouched', this.control.name)
		this.onTouched = fn
	}

	handleChange(event: Event) {
		this.value = this.inputElement.nativeElement.value
		this.onChange(this.inputElement.nativeElement.value)
	}

	handleBlur(event: Event) {
		this.onTouched(event)
	}
}
