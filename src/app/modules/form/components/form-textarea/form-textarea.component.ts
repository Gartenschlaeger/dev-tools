import { Component, ElementRef, Input, Optional, Self, ViewChild } from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'

@Component({
	selector: 'app-form-textarea',
	templateUrl: './form-textarea.component.html'
})
export class FormTextareaComponent implements ControlValueAccessor {
	@Input() label?: string
	@Input() placeholder?: string
	value: any = ''

	@ViewChild('textarea') inputElement!: ElementRef<HTMLTextAreaElement>

	constructor(
		@Self()
		@Optional()
		public control: NgControl
	) {
		if (control) {
			control.valueAccessor = this
		}
	}

	ngOnInit() {}

	onChange = (obj: any) => {}
	onTouched = (event: any) => {}

	writeValue(newValue: any) {
		this.value = newValue
	}

	registerOnChange(fn: any) {
		this.onChange = fn
	}

	registerOnTouched(fn: any) {
		this.onTouched = fn
	}

	handleChange(event: Event) {
		const input = event.target as HTMLTextAreaElement

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
