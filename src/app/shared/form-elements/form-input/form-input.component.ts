import { Component, forwardRef, Input } from '@angular/core'
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
    selector: 'form-input',
    templateUrl: './form-input.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormInputComponent), multi: true }]
})
export class FormInputComponent implements ControlValueAccessor {
    @Input() parentForm?: FormGroup
    @Input() fieldName?: string
    @Input() label?: string

    public internalValue?: string
    public isDisabled: boolean = false
    public changed = (value: string): void => {}
    public touched = (): void => {}

    get formField(): FormControl | undefined {
        if (this.fieldName) {
            return this.parentForm?.get(this.fieldName) as FormControl
        }
        return undefined
    }

    inputHandler(event: Event) {
        const value = (<HTMLInputElement>event.target).value
        this.changed(value)
    }

    touchedHandler(event: FocusEvent) {
        this.touched()
    }

    writeValue(value: string): void {
        this.internalValue = value
    }

    registerOnChange(fn: any): void {
        this.changed = fn
    }

    registerOnTouched(fn: any): void {
        this.touched = fn
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled
    }
}
