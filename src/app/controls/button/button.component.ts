import { Component, EventEmitter, Input, Output } from '@angular/core'
import { NgForm } from '@angular/forms'

export type ControlType = 'primary' | 'secondary' | 'danger'

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html'
})
export class ButtonComponent {
    @Input() type: ControlType = 'primary'
    @Input() isDisabled: boolean | null = false
    @Input() isSubmit: boolean = false
    @Input() form?: NgForm

    @Output() clickEmitter = new EventEmitter()

    isClickable(): boolean {
        if (this.form && this.form?.invalid) {
            return false
        }
        if (this.isDisabled) {
            return false
        }

        return true
    }

    clickHandler() {
        if (this.isClickable()) {
            this.clickEmitter.emit()
        }
    }
}
