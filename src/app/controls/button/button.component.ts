import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ControlValueAccessor } from '@angular/forms'

export type ControlType = 'primary' | 'secondary' | 'danger'

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html'
})
export class ButtonComponent implements ControlValueAccessor {
    @Input() type: ControlType = 'primary'
    @Input() isDisabled: boolean = false
    @Input() isSubmit: boolean = false

    @Output() click = new EventEmitter()

    writeValue(obj: any): void {
        console.log('writeValue')
    }

    registerOnChange(fn: any): void {
        console.log('registerOnChange')
    }

    registerOnTouched(fn: any): void {
        console.log('registerOnTouched')
    }
}
