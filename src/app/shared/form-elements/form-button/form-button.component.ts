import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
    selector: 'form-button',
    templateUrl: './form-button.component.html'
})
export class FormButtonComponent {
    @Input() parentForm?: FormGroup
    @Input() disableIfInvalid: boolean = false

    clickHandler(): boolean {
        if (this.parentForm) {
            for (let field in this.parentForm.controls) {
                let control = this.parentForm.get(field)
                control?.markAsTouched()
            }

            return this.parentForm.valid
        }

        return true
    }
}
