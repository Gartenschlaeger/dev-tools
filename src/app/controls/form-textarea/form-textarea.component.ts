import { Component, forwardRef, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
    selector: 'form-textarea',
    templateUrl: './form-textarea.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormTextareaComponent), multi: true }],
})
export class FormTextareaComponent implements ControlValueAccessor {
    value = ''

    @Input() id?: string
    @Input() placeholder?: string

    onChange = (obj: any) => {}
    onTouch = (event: FocusEvent) => {}

    writeValue(obj: any): void {
        this.value = obj
    }

    registerOnChange(callback: any): void {
        this.onChange = callback
    }

    registerOnTouched(callback: any): void {
        this.onTouch = callback
    }
}
