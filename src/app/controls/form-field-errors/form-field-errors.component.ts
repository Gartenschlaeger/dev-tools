import { Component, Input, OnInit } from '@angular/core'
import { AbstractControl, FormGroup } from '@angular/forms'

@Component({
    selector: 'app-form-field-errors',
    templateUrl: './form-field-errors.component.html'
})
export class FormFieldErrorsComponent implements OnInit {
    ngOnInit(): void {
        if (this.group && this.controlName) {
            this.formControl = this.group.get(this.controlName)
        }
    }

    @Input() group?: FormGroup
    @Input() controlName?: string

    formControl?: AbstractControl | null
}
