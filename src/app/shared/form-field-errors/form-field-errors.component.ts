import { Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
    selector: 'form-field-errors',
    templateUrl: './form-field-errors.component.html'
})
export class FormFieldErrorsComponent {
    @Input() public formField?: FormControl
}
