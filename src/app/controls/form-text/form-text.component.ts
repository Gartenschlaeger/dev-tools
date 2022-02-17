import { Component, forwardRef, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
    selector: 'form-text',
    templateUrl: './form-text.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormTextComponent), multi: true }],
})
export class FormTextComponent implements ControlValueAccessor {
    value?: string
    @Input() name?: string

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
